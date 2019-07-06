import update from 'immutability-helper';
import { graphql, compose } from 'react-apollo';
import { findIndex, get, map } from 'lodash';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import { withUsername } from 'core/utils/auth';
import { readImageFile } from 'core/utils/images';
import { connectAccount } from 'core/utils/social';
import { toggleBodyClass } from 'core/utils/dom';
import { asyncSequence, request } from 'core/utils/api';
import { withModal } from 'core/modules/modal';
import ImagesQuery from './graphql/Images.graphql';
import VideosQuery from './graphql/Videos.graphql';
import ProfileQuery from './graphql/Profile.graphql';
import ReviewTagsQuery from './graphql/ReviewTags.graphql';
import VoteReviewMutation from './graphql/VoteReview.graphql';
import CreateImageMutation from './graphql/CreateImage.graphql';
import CreateVideoMutation from './graphql/CreateVideo.graphql';
import CreateReviewMutation from './graphql/CreateReview.graphql';
import ReviewsReceivedQuery from './graphql/ReviewsReceived.graphql';
import ReviewsAuthoredQuery from './graphql/ReviewsAuthored.graphql';
import ApproveReviewMutation from './graphql/ApproveReview.graphql';

const CLASS = 'profile-edit-open';
export const toggleEditForm = (flag = false) => toggleBodyClass(CLASS, flag);

export const withProfile = (query = ProfileQuery) => compose(
  withUsername,
  graphql(query, {
    options: ({ username }) => ({ variables: { username } }),
    props: ({ ownProps, data }) => ({
      loading: data.loading,
      profile: data.profile,
      notFound: !data.loading && !data.profile,
      isOwner: data.profile && data.profile._id === ownProps.auth._id,
      isArtist: data.profile && data.profile.role === 'artist',
      refetchProfile: data.refetch,
      deleted: data.profile && data.profile.deleted,
    }),
  })
);

export const withPostImage = compose(
  withUsername,
  graphql(CreateImageMutation, {
    props: ({ mutate }) => ({
      postImage: data => mutate({
        variables: { data },
      }),
    }),
    options: ({ username }) => ({
      update: (proxy, { data }) => {
        const queryData = proxy.readQuery({
          query: ImagesQuery,
          variables: { username },
        });

        queryData.profile.images.push(data.createImage);
        proxy.writeQuery({ query: ImagesQuery, data: queryData });
      },
    }),
  })
);

export const withBulkUpload = compose(
  withPostImage,
  withState('loading', 'setLoading', false),
  withHandlers({
    upload: ({ postImage }) => photo => new Promise((resolve, reject) => {
      readImageFile(photo, ({ data }) => {
        postImage({ imageData: data })
          .then(resolve)
          .catch(reject);
      });
    }),
  }),
  withHandlers({
    bulkUpload: ({ setLoading, upload }) => (photos) => {
      setLoading(true);
      return asyncSequence(upload, photos).then(() => setLoading(false));
    },
  })
);

export const withBulkImport = compose(
  withModal('add_image', 'importImages'),
  withBulkUpload,
  withHandlers({
    onImport: ({ selection, photos: allPhotos, bulkUpload, onClose, importImages }) => () => {
      const photos = allPhotos
        .filter(p => selection.includes(p.id))
        .map(p => p.source);

      if (photos.length === 1) {
        onClose();
        importImages({ files: photos });
      } else {
        bulkUpload(photos)
          .then(onClose);
      }
    },
    onError: ({ onClose }) => (err) => {
      onClose();
      alert(err.error || err.message);
    },
  })
);

export const withPostVideo = compose(
  withUsername,
  withState('progress', 'updateProgress', null),
  graphql(CreateVideoMutation, {
    options: ({ username }) => ({
      update: (proxy, { data }) => {
        const queryData = proxy.readQuery({
          query: VideosQuery,
          variables: { username },
        });

        queryData.profile.videos.push(data.createVideo);
        proxy.writeQuery({ query: VideosQuery, data: queryData });
      },
    }),
  }),
  withHandlers({
    postVideo: ({
      updateProgress,
      mutate,
    }) => (data, file) => {
      const fd = new FormData();
      fd.append('video', file);

      return request({
        url: '/storage/video',
        method: 'POST',
        data: fd,
        onUploadProgress({ loaded, total }) {
          const progress = Math.round((loaded * 100) / total);
          updateProgress(progress === 100 ? 'Encoding...' : `${progress}%`);
        },
      }).then(response => mutate({
        variables: {
          data: Object.assign({}, data, { file: response.file }),
        },
      })).then(() => {
        updateProgress(null);
      }).catch((error) => {
        updateProgress(null);
        throw error;
      });
    },
  }),
);

export const withBulkVideoUpload = compose(
  withPostVideo,
  withState('loading', 'setLoading', false),
  withHandlers({
    upload: ({ postVideo }) => video => postVideo({}, video),
  }),
  withHandlers({
    bulkUpload: ({ setLoading, upload }) => (videos) => {
      setLoading(true);
      return asyncSequence(upload, videos).then(() => setLoading(false));
    },
  })
);

export const withReviewTags = graphql(ReviewTagsQuery, {
  props: ({ data }) => ({
    loading: data.loading,
    tags: map(data.reviewTags, tag => ({
      ...tag,
      selected: false,
    })),
    notFound: !data.loading && !data.reviewTags,
  }),
});

export const withReviewsAuthored = graphql(ReviewsAuthoredQuery, {
  props: ({ data }) => ({
    reviewsLoading: data.loading,
    reviews: data.reviewsAuthored,
    reviewsNotFound: !data.loading && !data.reviewsAuthored,
  }),
});

export const withReviewsCreate = compose(
  withModal('confirm', 'showConfirm'),
  withProfile(),
  graphql(CreateReviewMutation, {
    props: ({ mutate }) => ({
      createReview: ({ artist, data }) => mutate({
        variables: { artist, data },
      }),
    }),
    options: ({ username }) => ({
      update: (proxy, { data }) => {
        const queryData = proxy.readQuery({
          query: ReviewsReceivedQuery,
          variables: { username },
        });

        queryData.profile.reviewsReceived.push(data.createReview);
        proxy.writeQuery({ query: ReviewsReceivedQuery, data: queryData });
      },
    }),
  }),
  withHandlers({
    handleSubmit: ({ profile, createReview, showConfirm }) => (data) => {
      if (get(data, 'stars', 0) <= 3) {
        showConfirm({
          title: 'Confirm',
          body: 'Please note that the artist has the final say upon whether or not to allow the review to display on his profile. He will likely not allow a negative review to appear, however the purpose of this is to serve as a record in the InkSkill system. If an artist gets an accumulation of negative reviews with a low star count, we will investigate him/her. Do you wish to proceed with your review as is?',
          handleConfirm: () => createReview({ artist: profile._id, data }),
        });
      } else {
        createReview({ artist: profile._id, data });
      }
      return true;
    },
  }),
);

export const withReviewVote = compose(
  graphql(VoteReviewMutation, {
    props: ({ mutate }) => ({
      voteUpReview: id => mutate({
        variables: { data: { id, type: 'UP' } },
      }),
      voteDownReview: id => mutate({
        variables: { data: { id, type: 'DOWN' } },
      }),
      cancelReviewVote: id => mutate({
        variables: { data: { id, type: 'CANCEL' } },
      }),
    }),
    options: ({ type, username }) => ({
      update: (proxy, { data }) => {
        if (type === 'received') { // received reviews
          const queryData = proxy.readQuery({
            query: ReviewsReceivedQuery,
            variables: { username },
          });

          const index = findIndex(queryData.profile.reviewsReceived, { _id: data.voteReview._id });
          if (index > -1) {
            queryData.profile.reviewsReceived[index] =
              Object.assign({}, data.voteReview);
          }

          proxy.writeQuery({ query: ReviewsReceivedQuery, data: queryData });
        } else { // authored review
          const queryData = proxy.readQuery({
            query: ReviewsAuthoredQuery,
          });

          const index = findIndex(queryData.reviewsAuthored, { _id: data.voteReview._id });
          if (index > -1) {
            queryData.reviewsAuthored[index] =
              Object.assign({}, data.voteReview);
          }

          proxy.writeQuery({ query: ReviewsAuthoredQuery, data: queryData });
        }
      },
    }),
  }),
);

export const withReviewApprove = compose(
  graphql(ApproveReviewMutation, {
    props: ({ mutate }) => ({
      approveReview: id => mutate({
        variables: { data: { id, type: 'APPROVE' } },
      }),
      declineReview: id => mutate({
        variables: { data: { id, type: 'DECLINE' } },
      }),
    }),
    options: ({ username }) => ({
      update: (proxy, { data }) => {
        const queryData = proxy.readQuery({
          query: ReviewsReceivedQuery,
          variables: { username },
        });

        const index = findIndex(queryData.profile.reviewsReceived, { _id: data.voteReview._id });
        if (index > -1) {
          queryData.profile.reviewsReceived[index] =
            Object.assign({}, data.voteReview, { key: data.voteReview._id });
        }

        proxy.writeQuery({ query: ReviewsReceivedQuery, data: queryData });
      },
    }),
  }),
);

export const withSelection = getItems => compose(
  withState('selection', 'setSelection', []),
  withHandlers({
    toggleSelection: ({ selection, setSelection }) => (itemId) => {
      const index = selection.indexOf(itemId);
      let change = { $splice: [[index, 1]] };

      if (index < 0) {
        change = { $push: [itemId] };
      }

      const newSelection = update(selection, change);
      setSelection(newSelection);
    },
    selectAll: ({ setSelection, ...props }) => () => {
      const items = getItems(props);
      setSelection(items.filter(p => p.valid).map(p => p.id));
    },
    clearAll: ({ setSelection }) => () => {
      setSelection([]);
    },
  }),
);

export const withSocialConnect = compose(
  withProfile(),
  withState('loading', 'setLoading', false),
  withHandlers({
    linkAccount: ({ urls, setLoading, refetchProfile }) => (type) => {
      if (urls[type] || !confirm('Do you want to connect this account?')) return;

      setLoading(true);

      connectAccount(type).then(() => {
        refetchProfile();
        setLoading(false);
      }).catch((error) => {
        alert('Can not connect this account.');
        throw error;
      });
    },
  })
);
