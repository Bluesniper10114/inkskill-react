// @flow

import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { apiRequest } from 'core/utils/api';
import { RESET, selectors as profile } from './data';

const FETCH = 'profile/reviews/FETCH';
const initialState = [];

export const fetch = (userId: number) => apiRequest(FETCH, `/dev/profile/${userId}/reviews`);

export default handleActions({
  [RESET]: () => initialState,
  [FETCH]: (state, { payload }) => payload || state,
}, initialState);

const getReviewsList = state => state.profile.reviews;
const getReviews = createSelector(
  getReviewsList,
  profile.getId,
  (reviews, profileId) => ({
    reviews,
    profileId,
  })
);

export const selectors = {
  getReviews,
};
