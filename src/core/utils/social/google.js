/* global gapi:true */

import { GOOGLE_ID } from 'core/config/env';
import { request } from 'core/utils/api';
import loadSDK from './loader';

let auth2;

const getTokenValue = (user) => {
  const auth = user.getAuthResponse();
  return auth.access_token;
};

const initSigninV2 = () => new Promise((resolve, reject) => {
  gapi.auth2.init({
    client_id: `${GOOGLE_ID}.apps.googleusercontent.com`,
    scope: 'profile',
  }).then((auth) => {
    auth2 = auth;
    resolve();
  }, reject);
});

const initScript = () => loadSDK('gapi', 'https://apis.google.com/js/platform.js').then(() =>
  new Promise((resolve, reject) => {
    gapi.load('auth2', () => {
      initSigninV2().then(resolve).catch(reject);
    });
  }));

const getToken = () => new Promise((resolve) => {
  if (auth2.isSignedIn.get() !== true) {
    auth2.signIn().then((user) => {
      resolve(getTokenValue(user));
    });
  } else {
    resolve(getTokenValue(auth2.currentUser.get()));
  }
});

export const connectAccount = () => initScript()
  .then(getToken)
  .then((token) => {
    if (!token) throw new Error('Can not connect the Google Plus account');

    return request({
      url: '/auth/google/connect',
      method: 'POST',
      data: { token },
    });
  });
