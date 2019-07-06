import { createAction, handleActions } from 'redux-actions';

const SET = 'post-overlay/track/SET';
const initialState = {};

export const setTrack = createAction(SET);

export default handleActions({
  [SET]: (state, { payload }) => payload,
}, initialState);
