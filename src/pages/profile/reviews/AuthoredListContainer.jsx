import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import withLoading from 'core/utils/loading';
import { withProfile, withReviewsAuthored, withReviewVote, withReviewApprove } from '../shared/utils';
import List from './List';

export default compose(
  withProps({ type: 'authored' }),
  withProfile(),
  withReviewsAuthored,
  withLoading(({ loading, reviewsLoading }) => loading || reviewsLoading),
  withReviewVote,
  withReviewApprove,
)(List);
