import compose from 'recompose/compose';
import withLoading from 'core/utils/loading';
import { withTrack } from 'core/utils/track';
import { withProfile } from '../shared/utils';
import ProfileImagesQuery from '../shared/graphql/Images.graphql';
import List from './List';

export default compose(
  withProfile(ProfileImagesQuery),
  withTrack(({ profile }) => profile.images),
  withLoading(),
)(List);
