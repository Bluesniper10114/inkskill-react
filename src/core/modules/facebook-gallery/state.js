import update from 'immutability-helper';
import uniqBy from 'lodash/uniqBy';
import difference from 'lodash/difference';
import { handleActions, createAction } from 'redux-actions';
import { getAlbums, getPhotos } from 'core/utils/social/facebook';
import { validateImage } from 'core/utils/images';
import { selectors as auth, facebookLogin } from 'core/state/auth';

const SET_VIEW = 'SET_VIEW';
const SET_LOADING = 'SET_LOADING';
const SET_SELECTION = 'SET_SELECTION';
const FETCH_ALBUMS = 'FETCH_ALBUMS';
const FETCH_PHOTOS = 'FETCH_PHOTOS';
const RESET = 'RESET';

const initialState = {
  view: 'albums',
  albums: [],
  photos: [],
  allPhotos: [],
  selection: [],
};

const getFacebookGallery = state => state.facebookGallery;


export const setView = createAction(SET_VIEW);
export const setLoading = createAction(SET_LOADING);
export const setAlbums = createAction(FETCH_ALBUMS);
export const setPhotos = createAction(FETCH_PHOTOS);
export const setSelection = createAction(SET_SELECTION);
export const reset = createAction(RESET);

export const toggleSelection = photoId => (dispatch, getState) => {
  const { selection } = getFacebookGallery(getState());
  const index = selection.indexOf(photoId);
  let change = { $splice: [[index, 1]] };

  if (index < 0) {
    change = { $push: [photoId] };
  }

  const newSelection = update(selection, change);
  dispatch(setSelection(newSelection));
};

export const selectAll = () => (dispatch, getState) => {
  const { photos, selection } = getFacebookGallery(getState());
  const ids = photos.filter(p => p.valid).map(p => p.id);
  const newSelection = difference(ids, selection);

  dispatch(setSelection(selection.concat(newSelection)));
};

export const clearAll = () => (dispatch, getState) => {
  const { photos, selection } = getFacebookGallery(getState());
  const ids = photos.map(p => p.id);
  const newSelection = difference(selection, ids);

  dispatch(setSelection(newSelection));
};

export const fetchAlbums = () => (dispatch) => {
  dispatch(setLoading(true));

  return getAlbums()
    .then((data) => {
      dispatch(setAlbums(data));
      dispatch(setLoading(false));
      dispatch(setPhotos([]));
    });
};

export const fetch = () => (dispatch, getState) => {
  const { urls } = auth.getAuthData(getState());

  if (urls && urls.fb) {
    return dispatch(fetchAlbums());
  }

  dispatch(setLoading(true));
  return dispatch(facebookLogin(false))
    .then(() => dispatch(fetchAlbums()));
};

export const fetchPhotos = album => (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setView('photos'));
  getPhotos(album.id).then((data) => {
    dispatch(setPhotos(data.map(p => Object.assign({}, p, {
      valid: validateImage(p.source),
      source: p.source.source,
    }))));
    dispatch(setLoading(false));
  });
};

const mergePhotos = (list1, list2) => uniqBy(list1.concat(list2), 'id');

export default handleActions({
  [SET_VIEW]: (state, { payload }) => update(state, { view: { $set: payload } }),
  [SET_LOADING]: (state, { payload }) => update(state, { loading: { $set: payload } }),
  [SET_SELECTION]: (state, { payload }) => update(state, { selection: { $set: payload } }),
  [RESET]: () => initialState,
  [FETCH_ALBUMS]: (state, { payload }) => update(state, { albums: { $set: payload } }),
  [FETCH_PHOTOS]: (state, { payload }) => update(state, {
    photos: { $set: payload },
    allPhotos: { $set: mergePhotos(state.allPhotos, payload) },
  }),
}, initialState);

export const selectors = {
  getFacebookGallery,
};
