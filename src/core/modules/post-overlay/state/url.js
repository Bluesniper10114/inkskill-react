import update from 'immutability-helper';
import { createAction, handleActions } from 'redux-actions';
import { getOverlayData } from './selectors';

const BACKUP = 'post-overlay/url/BACKUP';
const initialState = {
  backup: null,
};

export const backup = createAction(BACKUP);
export const setUrl = newUrl => (dispatch, getState) => {
  const { url } = getOverlayData(getState());

  if (url.backup) {
    history.replaceState(null, null, newUrl);
  } else {
    dispatch(backup(location.pathname));
    history.pushState(null, null, newUrl);
  }
};

export const restoreUrl = () => (dispatch, getState) => {
  const { url } = getOverlayData(getState());
  window.history.pushState(null, null, url.backup);
  dispatch(backup(null));
};

export default handleActions({
  [BACKUP]: (state, { payload }) => update(state, { backup: { $set: payload } }),
}, initialState);
