// @flow

import update from 'immutability-helper';
import { handleActions, createAction } from 'redux-actions';
import { push } from 'react-router-redux';
import { createSelector } from 'reselect';
import { request } from 'core/utils/api';
import { getCurrentProfileUrl } from 'core/utils/profile';
import { toggleBodyClass } from 'core/utils/dom';
import * as facebook from 'core/utils/social/facebook';

const KEY = 'auth';
const LOGIN = 'auth/LOGIN';
const UPDATE = 'auth/UPDATE';
const LOGOUT = 'auth/LOGOUT';
const LOADING = 'auth/LOADING';

type LoginData = {
  username: string,
  password: string,
};

type SignUpData = {
  username: string,
  email: string,
  password: string,
  passwordConfirm: string,
  role: string,
  gender: string,
};

type ForgotPWDData = {
  email: string,
}

type ResetPWDData = {
  password: string,
  token: string,
}

const getAuthData = (state: RootState) => state.auth;

const readUser = () => {
  const authData = localStorage.getItem(KEY);

  return authData ? JSON.parse(authData) : {};
};

const writeUser = (user) => {
  localStorage.setItem(KEY, JSON.stringify(user));
  localStorage.setItem('subscribed', JSON.stringify(true));
};

const setLogin = createAction(LOGIN);
const setLogout = createAction(LOGOUT);
const loading = createAction(LOADING);

const checkForRedirect = (user, prev) => (dispatch) => {
  const url = getCurrentProfileUrl(user);
  const verificationChanged = prev && prev.isVerified === user.isVerified;

  if (prev && url === getCurrentProfileUrl(prev) && verificationChanged) {
    return;
  }

  dispatch(push(url));
};

const onLoginSuccess = ({ user }, redirect = true) => (dispatch) => {
  writeUser(user);

  if (redirect) dispatch(checkForRedirect(user));
  dispatch(setLogin(user));
  dispatch(loading(false));
  toggleBodyClass('authenticated', true);
};

export const updateAuth = (payload: Object) => (dispatch: Function, getState: Function) => {
  const user = Object.assign({}, readUser(), payload);
  const prev = getAuthData(getState());
  writeUser(user);

  dispatch(checkForRedirect(user, prev));
  dispatch({
    type: UPDATE,
    payload,
  });
};

export const verify = (code: string) => (dispatch: Function) => request({
  url: '/auth/verification',
  method: 'POST',
  data: { code },
}).then(() => dispatch(updateAuth({ isVerified: true })));

export const resendVerificationCode = () => () => request({
  url: '/auth/verification/resend',
  method: 'POST',
});

export const logout = () => (dispatch: Function) => {
  request({
    url: '/auth/logout',
    method: 'POST',
  }).then(() => {
    dispatch(setLogout());
    toggleBodyClass('authenticated', false);
    localStorage.removeItem(KEY);
  });
};

export const checkLogin = () => (dispatch: Function, getState: Function) => {
  const { auth } = getState();
  if (!auth._id) return;

  dispatch(loading(true));

  request('/auth/check')
    .then(({ user }) => dispatch(onLoginSuccess({ user }, false)))
    .catch(() => {
      console.warn('user is not authorized');
      dispatch(logout());
    });
};

export const login = (data: LoginData) => (dispatch: Function) => {
  dispatch(loading(true));
  return request({
    url: '/auth/login',
    method: 'POST',
    data,
  }).then(response => dispatch(onLoginSuccess(response)));
};

export const register = (data: SignUpData) => (dispatch: Function) => {
  dispatch(loading(true));

  return request({
    url: '/auth/register',
    method: 'POST',
    data,
  }).then((response) => {  // eslint-disable-line
    localStorage.setItem('subscribed', JSON.stringify(true));
    return process.env.NODE_ENV === 'production' ?
      dispatch(push('/thank-you')) :
      dispatch(onLoginSuccess(response));
  });
};

export const facebookLogin = (redirect: boolean = true) => (dispatch: Function) => {
  dispatch(loading(true));

  return new Promise((resolve, reject) => {
    facebook.login((fbResponse) => {
      if (!fbResponse) return;

      request({
        method: 'POST',
        url: '/auth/facebook/check',
        data: fbResponse,
      }).then((response) => {
        resolve();
        return response;
      }).then((response) => { // eslint-disable-line
        localStorage.setItem('subscribed', JSON.stringify(true));
        return process.env.NODE_ENV === 'production' ?
          dispatch(push('/thank-you')) :
          dispatch(onLoginSuccess(response, redirect));
      })
        .catch((err) => {
          dispatch(loading(false));
          reject(err);
        });
    });
  });
};

export const forgotSubmit = (data: ForgotPWDData) => (dispatch: Function) => {
  dispatch(loading(true));
  return request({
    url: '/auth/forgot',
    method: 'POST',
    data,
  }).then((response) => {
    console.log('Forgot response = ', response);
    dispatch(push('/forgot-sent'));
  });
};

export const resetSubmit = (data: ResetPWDData) => (dispatch: Function) => {
  dispatch(loading(true));
  return request({
    url: '/auth/reset',
    method: 'POST',
    data,
  }).then((response) => {
    console.log('RESET response = ', response);
    if (!response || !response.user) {
      dispatch(push('/login'));
    } else {
      dispatch(onLoginSuccess(response, false));
    }
  });
};

export const checkResetToken = (token: string) => (dispatch: Function) => {
  dispatch(loading(true));
  return request({
    url: '/auth/reset',
    method: 'GET',
    params: {
      token,
    },
  }).then((response) => {
    console.log('CheckResetToken response = ', response);
  });
};

export default handleActions({
  [LOGIN]: (state, { payload }) => payload || { loading: true },
  [LOADING]: (state, { payload }) => update(state, { loading: { $set: payload } }),
  [UPDATE]: (state, { payload }) => update(state, { $merge: payload }),
  [LOGOUT]: () => ({}),
}, readUser());


const getAuth = createSelector(
  getAuthData,
  auth => ({ auth })
);

const getCurrentUserId = createSelector(
  getAuthData,
  auth => auth._id
);

export const selectors = {
  getAuth,
  getAuthData,
  getCurrentUserId,
};
