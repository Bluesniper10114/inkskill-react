// @flow

import { handleActions, createAction } from 'redux-actions';
import { request } from 'core/utils/api';

const FETCH = 'site/home/FETCH';
const initialState = {};
const fetchAction = createAction(FETCH);

export const fetch = () => (dispatch: Function) => request('/dev/home')
  .then(({ blog }) => dispatch(fetchAction({ blog })));

export default handleActions({
  [FETCH]: (state, { payload }) => payload || state,
}, initialState);


const getHome = (state: RootState) => state.site.home;
export const selectors = {
  getHome,
};
