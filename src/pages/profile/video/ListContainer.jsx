import compose from 'recompose/compose';
import withLoading from 'core/utils/loading';
import { withTrack } from 'core/utils/track';
import { withProfile } from '../shared/utils';
import ProfileVideosQuery from '../shared/graphql/Videos.graphql';
import List from './List';

export default compose(
  withProfile(ProfileVideosQuery),
  withTrack(({ profile }) => profile.videos),
  withLoading()
)(List);
