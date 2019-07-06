/* eslint-disable no-plusplus */

import uniqueId from 'lodash/uniqueId';
import { request } from 'core/utils/api';
import { INSTAGRAM_ID } from 'core/config/env';

const baseUrl = 'https://api.instagram.com/oauth/authorize/';
const params = `client_id=${INSTAGRAM_ID}&redirect_uri=${location.origin}/redirect/instagram&response_type=token`;
const url = `${baseUrl}?${params}`;
const error = new Error('Can\'t fetch Instagram photos');

let accessToken = localStorage.getItem('instagram');
let tries = 0;

const extractToken = ({ location }) => {
  const { hash } = location;

  if (hash) {
    const [, token] = hash.split('=');
    return token;
  }

  return false;
};

const getToken = (callback, force) => {
  if (accessToken && !force) {
    callback(accessToken);
    return;
  }

  let init = false;
  const win = window.open(url, 'instagram', 'width=530,height=340');
  const interval = setInterval(() => {
    try {
      accessToken = extractToken(win);
      if (win.closed) clearInterval(interval);
      if (init || accessToken) {
        win.close();
        callback(accessToken);
        localStorage.setItem('instagram', accessToken);
        clearInterval(interval);
      }
    } catch (e) {
      init = true;
    }
  }, 200);
};

const parsePhoto = ({ images }) => ({
  id: uniqueId('instagram'),
  valid: true,
  preview: images.low_resolution.url,
  source: {
    width: images.standard_resolution.width,
    height: images.standard_resolution.height,
    source: images.standard_resolution.url,
  },
});

const parsePhotos = (data) => {
  let photos = [];

  data.forEach((item) => {
    if (item.type === 'image') {
      photos.push(parsePhoto(item));
    } else if (item.type === 'carousel') {
      photos = photos.concat(parsePhotos(item.carousel_media));
    }
  });

  return photos;
};

const fetchPhotos = (force = false) => new Promise((resolve, reject) => {
  getToken((token) => {
    if (!token) return reject(error);

    return request(`/proxy/instagram/media?token=${token}`)
      .then((response) => {
        const errorType = response.meta.error_type;

        if (errorType && tries < 3) {
          tries++;
          fetchPhotos(true).then(resolve).catch(reject);
        } else if (errorType) {
          reject(error);
        } else {
          resolve(parsePhotos(response.data || []));
        }
      });
  }, force);
});

export const connectAccount = () => new Promise((resolve, reject) => {
  getToken((token) => {
    if (!token) return reject(error);

    return request({
      url: '/auth/instagram/connect',
      method: 'POST',
      data: { token },
    }).then(resolve).catch(reject);
  });
});

export const getPhotos = () => fetchPhotos();
