// @flow

import update from 'immutability-helper';
import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { updateAuth, selectors as auth } from 'core/state/auth';
import { apiRequest } from 'core/utils/api';

const getProfileData = (state: RootState) => state.profile.data;

export const TOGGLE_FOLLOW = 'profile/TOGGLE_FOLLOW';
export const RESET = 'profile/RESET';
export const FETCH = 'profile/data/FETCH';
const UPDATE = 'profile/data/UPDATE';
const initialState = {
  id: null,
};

export const toggleFollow = () => (dispatch: Function, getState: Function) => {
  const state = getState();
  const profile = getProfileData(state);
  const my = auth.getAuthData(state);
  const modifier = profile.isFollowing ? -1 : 1;

  dispatch({
    type: TOGGLE_FOLLOW,
    payload: {
      isFollowing: !profile.isFollowing,
      followers: profile.followers + modifier,
    },
  });

  dispatch(updateAuth({
    following: my.following + modifier,
  }));
};

export const fetch = (username: string) => (dispatch: Function, getState: Function) => {
  const authData = auth.getAuthData(getState());

  dispatch({ type: RESET });

  if (authData.username === username) {
    dispatch({
      type: FETCH,
      payload: authData,
    });
  } else {
    dispatch(apiRequest(FETCH, `/dev/profile/${username}`));
  }
};

export const updateProfile = (data: Object) => (dispatch: Function) => {
  dispatch({
    type: UPDATE,
    payload: data,
  });

  dispatch(updateAuth(data));
};

export default handleActions({
  [FETCH]: (state, { payload }) => payload || initialState,
  [UPDATE]: (state, { payload }) => update(state, { $merge: payload }),
  [TOGGLE_FOLLOW]: (state, { payload }) => update(state, { $merge: payload }),
}, initialState);


const getUsername = (state, ownProps) => ownProps.params.username;
const getId = createSelector(getProfileData, data => data._id);
const getNavigation = createSelector(
  getUsername,
  username => ({
    baseUri: `/ink${username ? `/${username}` : ''}`,
  })
);

const getIsOwner = createSelector(
  getId,
  auth.getCurrentUserId,
  (profileUserId, currentUserId) => profileUserId === currentUserId
);

const getProfile = createSelector(
  getProfileData,
  getUsername,
  getIsOwner,
  (profile, username, isOwner) => ({
    profile,
    username,
    isOwner,
  })
);

const getProfileForm = createSelector(
  getProfileData,
  data => ({ data })
);

export const selectors = {
  getId,
  getIsOwner,
  getProfile,
  getProfileData,
  getProfileForm,
  getNavigation,
};
