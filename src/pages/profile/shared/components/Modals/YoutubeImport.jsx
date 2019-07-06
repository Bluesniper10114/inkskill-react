import React from 'react';
import classNames from 'classnames';
import { graphql } from 'react-apollo';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import { AlbumPhotos } from 'core/modules/facebook-gallery';
import withLoading from 'core/utils/loading';
import { getVideos } from 'core/utils/social/youtube';
import { withUsername } from 'core/utils/auth';
import { withSelection } from '../../utils';
import YoutubeImportMutation from '../../graphql/YoutubeImport.graphql';
import VideosQuery from '../../graphql/Videos.graphql';

const Modal = ({
  videos,
  selection,
  toggleSelection,
  selectAll,
  clearAll,
  onClose,
  onImport,
}) => (
  <div className="modal-content">
    <div className="modal-header">
      <button type="button" className="close" onClick={onClose}>
        <span>&times;</span>
      </button>
      <h4 className="modal-title">Add from Youtube</h4>
    </div>

    <div className={classNames('modal-body facebook-import', { 'error-container': !videos.length })}>
      {!videos.length
        ? <div className="error">Videos are not found</div>
        : <AlbumPhotos
          photos={videos}
          selection={selection}
          toggleSelection={toggleSelection}
          selectAll={selectAll}
          clearAll={clearAll}
        />
      }
    </div>

    <div className="modal-footer">
      <span className="text-left">{selection.length} videos selected</span>
      <div className="text-right">
        <button className="btn btn-default" onClick={onClose}>Cancel</button>
        <button
          className="btn btn-danger"
          disabled={!selection.length}
          onClick={onImport}
        >
          Import
        </button>
      </div>
    </div>
  </div>
);

export default compose(
  withUsername,
  graphql(YoutubeImportMutation, {
    options: ({ username }) => ({
      update: (proxy, { data }) => {
        const queryData = proxy.readQuery({
          query: VideosQuery,
          variables: { username },
        });

        const profile = queryData.profile;
        profile.videos = profile.videos.concat(data.youtubeImport);
        proxy.writeQuery({ query: VideosQuery, data: queryData });
      },
    }),
  }),
  withState('loading', 'setLoading', false),
  withState('videos', 'setVideos', []),
  withSelection(({ videos }) => videos),
  withHandlers({
    onImport: ({ mutate, setLoading, selection, onClose }) => () => {
      setLoading(true);

      return mutate({ variables: { data: selection } })
        .then(onClose);
    },
  }),
  lifecycle({
    componentWillMount() {
      const { setLoading, setVideos, onClose } = this.props;

      setLoading(true);
      getVideos()
        .then((videos) => {
          setVideos(videos);
          setLoading(false);
        }).catch((err) => {
          onClose();
          alert(err.message);
        });
    },
  }),
  withLoading(),
)(Modal);
