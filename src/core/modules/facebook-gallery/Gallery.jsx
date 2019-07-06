import { connect } from 'react-redux';
import compose from 'recompose/compose';
import branch from 'recompose/branch';
import lifecycle from 'recompose/lifecycle';
import renderComponent from 'recompose/renderComponent';
import withLoading from 'core/utils/loading';
import { selectors, fetch, reset } from './state';
import AlbumsList from './AlbumsList';
import AlbumPhotos from './AlbumPhotosContainer';

export default compose(
  connect(selectors.getFacebookGallery, { fetch, reset }),
  lifecycle({
    componentWillMount() {
      this.props.fetch()
        .catch(this.props.onError);
    },
    componentWillUnmount() {
      this.props.reset();
    },
  }),
  withLoading(),
  branch(
    ({ view }) => view === 'photos',
    renderComponent(AlbumPhotos),
  )
)(AlbumsList);
