import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import withLoading from 'core/utils/loading';
import { withProfile, withReviewVote, withReviewApprove } from '../shared/utils';
import ReviewsReceivedQuery from '../shared/graphql/ReviewsReceived.graphql';
import List from './List';

export default compose(
  withProfile(ReviewsReceivedQuery),
  withLoading(),
  withReviewVote,
  withReviewApprove,
  withProps(({ profile }) => ({
    type: 'received',
    reviews: profile.reviewsReceived,
  })),
)(List);
