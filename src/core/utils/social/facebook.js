/* eslint-disable no-plusplus */
/* global FB */

import { FB_APP_ID } from 'core/config/env';
import { request } from 'core/utils/api';
import maxBy from 'lodash/maxBy';
import loadSDK from './loader';

let tries = 0;
const FIELDS = [
  'id',
  'name',
  'first_name',
  'last_name',
  'gender',
  'link',
  'locale',
  'email',
  'timezone',
  'updated_time',
  'verified',
  'location',
];

const PERMISSIONS = [
  'public_profile',
  'email',
  'user_photos',
  'user_location',
];

const initFB = () => FB.init({
  appId: FB_APP_ID,
  cookie: true,
  xfbml: true,
  version: 'v2.8',
});

// Load the SDK asynchronously
const initScript = () => loadSDK('facebook-jssdk', '//connect.facebook.net/en_US/sdk.js')
  .then(initFB);

const statusChangeCallback = onLogin => (response) => {
  if (response.status === 'connected') {
    const { accessToken } = response.authResponse;
    FB.api(`/me?fields=${FIELDS.join(',')}`,
      data => onLogin(Object.assign({ accessToken }, data))
    );
  } else if (typeof onLogin === 'function') {
    onLogin(false);
  }
};

const waitForLoading = fn => initScript().then(fn);

export const login = onLogin => waitForLoading(() =>
  FB.login(statusChangeCallback(onLogin), {
    scope: PERMISSIONS.join(','),
  }));

export const logout = onLogout => waitForLoading(() =>
  FB.logout(statusChangeCallback(onLogout)));

function check(onCheck) {
  FB.getLoginStatus(({ authResponse }) => {
    if (!authResponse) {
      login(onCheck);
    } else {
      onCheck();
    }
  });
}

const callApi = url => waitForLoading(() =>
  new Promise((resolve, reject) => FB.api(url, (response) => {
    const isError = (!response || response.error);

    if (isError && tries < 3) {
      tries++;
      check(() => callApi(url).then(resolve).catch(reject));
    } else if (isError) {
      reject(response.error);
    } else {
      tries = 0;
      resolve(response.data);
    }
  })));

export const connectAccount = () => new Promise((resolve, reject) => login(data => request({
  url: '/auth/facebook/connect',
  method: 'POST',
  data,
}).then(resolve).catch(reject)));

export function getAlbums() {
  const url = '/me/albums?fields=id,name,count,cover_photo{id,source}';

  return callApi(url)
    .then(data => data.filter(a => a.count).map(a => ({
      id: a.id,
      name: a.name,
      cover: a.cover_photo && a.cover_photo.source,
    })));
}

export function getPhotos(albumId) {
  const url = `${albumId}/photos?limit=24&fields=id,source,images`;
  return callApi(url)
    .then(data => data.map(p => ({
      id: p.id,
      preview: p.source,
      source: maxBy(p.images, img => img.width * img.height),
    })));
}

window.fbAsyncInit = initFB;
