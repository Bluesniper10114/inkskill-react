/* global gapi:true */

import { GOOGLE_ID } from 'core/config/env';
import loadSDK from './loader';

const CLIENT_ID = `${GOOGLE_ID}.apps.googleusercontent.com`;
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

function initClient() {
  return gapi.client.init({
    discoveryDocs: DISCOVERY_DOCS,
    clientId: CLIENT_ID,
    scope: SCOPES,
  });
}

const initScript = () => loadSDK('google-api', 'https://apis.google.com/js/api.js').then(() =>
  new Promise((resolve, reject) => {
    gapi.load('client:auth2', () => {
      initClient().then(resolve, reject);
    });
  }));

const checkAuth = () => new Promise((resolve, reject) => {
  gapi.auth2.getAuthInstance().then((auth) => {
    if (auth.isSignedIn.get()) {
      resolve();
    } else {
      auth.signIn().then(resolve, reject);
    }
  }, reject);
});

const getUploadsPlaylistId = () => new Promise((resolve, reject) => {
  gapi.client.youtube.channels.list({
    mine: true,
    part: 'contentDetails',
  }).then(({ result }) => resolve(result.items[0].contentDetails.relatedPlaylists.uploads), reject);
});

const getPlaylistVideos = playlistId => new Promise((resolve, reject) => {
  gapi.client.youtube.playlistItems.list({
    playlistId,
    part: 'snippet',
  }).then(({ result }) => resolve(result.items), reject);
});

export const getVideos = () => initScript()
  .then(checkAuth)
  .then(getUploadsPlaylistId)
  .then(getPlaylistVideos)
  .then(videos => videos.map(({ snippet }) => {
    const { thumbnails, title, resourceId } = snippet;
    return ({
      id: resourceId.videoId,
      name: title,
      preview: thumbnails.medium.url,
      valid: true,
    });
  }))
  .catch((err) => {
    console.log(err);
    throw new Error('Can\'t fetch Youtube videos');
  });
