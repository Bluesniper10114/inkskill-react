import { connect } from 'react-redux';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import * as state from './state';
import AlbumPhotos from './AlbumPhotos';

export default compose(
  connect(state.selectors.getFacebookGallery, state),
  withHandlers({
    onBack: ({ setView }) => () => setView('albums'),
  })
)(AlbumPhotos);
