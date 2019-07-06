// @flow

import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { apiRequest } from 'core/utils/api';
import { actions as modal, selectors as modalSelectors } from 'core/modules/modal';
import { RESET, selectors as profile } from './data';

const FETCH = 'profile/followers/FETCH';
const initialState = null;

export const fetchFollowers = (userId: number) => apiRequest(FETCH, `/dev/profile/${userId}/followers`);
export const showFollowers = (userId: number) => (dispatch: Function) => {
  dispatch(modal.show({ id: 'followers' }));
  dispatch(fetchFollowers(userId));
};

export const fetchFollowing = (userId: number) => apiRequest(FETCH, `/dev/profile/${userId}/following`);
export const showFollowing = (userId: number) => (dispatch: Function) => {
  dispatch(modal.show({ id: 'following' }));
  dispatch(fetchFollowing(userId));
};

export default handleActions({
  [RESET]: () => initialState,
  [FETCH]: (state, { payload }) => payload || null,
}, initialState);

const getFollowersList = state => state.profile.followers;
const getFollowers = createSelector(
  getFollowersList,
  profile.getId,
  (followers, profileId) => ({
    followers,
    profileId,
  })
);

const getFollowersModal = createSelector(
  modalSelectors.firstModal,
  getFollowersList,
  (modalData, followers) => ({
    id: modalData.id,
    followers,
  })
);

export const selectors = {
  getFollowers,
  getFollowersModal,
};
