import { connect } from 'react-redux';
import { showFollowers, showFollowing } from '../../state/followers';
import Stats from './Stats';

export default connect(
  null,
  (dispatch, { stats }) => ({
    showFollowers: () => dispatch(showFollowers(stats.profileId)),
    showFollowing: () => dispatch(showFollowing(stats.profileId)),
  })
)(Stats);
