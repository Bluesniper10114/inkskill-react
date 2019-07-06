// @flow

import { handleActions } from 'redux-actions';
import { apiRequest } from 'core/utils/api';

const FETCH = 'blog/info/FETCH';
const initialState = {
  popular: [],
  feature: [],
};

export const fetch = () => apiRequest(FETCH, '/web/bloglistsearch');
export default handleActions({
  [FETCH]: (state, { payload }) => payload || state,
}, initialState);


const getInfo = (state: RootState) => state.blog.info;
export const selectors = {
  getInfo,
};
