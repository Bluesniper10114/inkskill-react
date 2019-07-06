import { connect } from 'react-redux';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import { download } from 'core/utils/posts';
import { getPost } from '../state/selectors';
import * as actions from '../state/post';
import Content from './Content';

export default compose(
  connect(getPost, actions),
  withHandlers({
    toggleSharing: ({ setSharing, sharing }) => () => setSharing(!sharing),
    toggleFullScreen: ({ setFullScreen, fullScreen }) => () => setFullScreen(!fullScreen),
    download: ({ post }) => () => download(post),
  })
)(Content);
