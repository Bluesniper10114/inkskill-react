import React from 'react';
import Review from './Review';

const List = ({
  reviews,
  auth,
  voteUpReview,
  voteDownReview,
  cancelReviewVote,
  approveReview,
  declineReview,
}) => (
  <div className="comment-box">
    { reviews.length > 0 ?
      <ul>
        {reviews.map(review => (
          <Review
            key={review._id}
            data={review}
            auth={auth}
            voteUp={voteUpReview}
            voteDown={voteDownReview}
            cancelVote={cancelReviewVote}
            approve={approveReview}
            decline={declineReview}
          />
        ))}
      </ul> :
      <p className="text-center">No reviews found.</p>
    }
  </div>
);

export default List;
