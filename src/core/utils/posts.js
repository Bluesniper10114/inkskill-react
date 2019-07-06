import { graphql, compose } from 'react-apollo';
import update from 'immutability-helper';
import findIndex from 'lodash/findIndex';
import { withUsername } from 'core/utils/auth';
import LikePostMutation from 'core/graphql/LikePost.graphql';
import PostQuery from 'core/graphql/Post.graphql';
import RotateImageMutation from 'core/graphql/RotateImage.graphql';
import ImagesQuery from '../../pages/profile/shared/graphql/Images.graphql';

export const withLike = graphql(LikePostMutation, {
  props: ({ mutate, ownProps }) => ({
    onLike: type => mutate({
      variables: {
        id: ownProps.post.post,
        type: Number(type) !== ownProps.post.likeType ? type : 0,
      },
    }),
  }),
});

export const withRotate = compose(
  withUsername,
  graphql(RotateImageMutation, {
    props: ({ mutate, ownProps }) => ({
      onRotate: direction => mutate({
        variables: { id: ownProps.post._id, direction },
      }),
    }),
    options: ({ post, username }) => ({
      update: (proxy, { data }) => {
        const postData = proxy.readQuery({
          query: PostQuery,
          variables: { id: post.post },
        });

        postData.post = Object.assign(postData.post, data.rotateImage);
        proxy.writeQuery({ query: PostQuery, data: postData });

        const profileData = proxy.readQuery({
          query: ImagesQuery,
          variables: { username },
        });

        const { images } = profileData.profile;
        const index = findIndex(images, { _id: post._id });
        const image = Object.assign({}, images[index], { previewUrl: data.rotateImage.previewUrl });

        profileData.profile.images = update(images, { [index]: { $set: image } });
        proxy.writeQuery({ query: ImagesQuery, data: profileData });
      },
    }),
  })
);

export const getStyles = (style) => {
  if (!style) return '';

  return style.map(s => s.name).join(', ');
};

export const getPostUrl = postId => `/post/${postId}`;

export const getSourceUrl = (post) => {
  if (post.source && post.source.type === 'youtube') {
    return `https://youtube.com/watch?v=${post.source.id}`;
  }

  return post.url;
};

export const download = (post) => {
  const link = document.createElement('a');
  link.href = getSourceUrl(post);
  link.target = '_blank';
  link.click();
};
