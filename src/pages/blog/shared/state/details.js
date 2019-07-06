// @flow

import { handleActions } from 'redux-actions';
import { apiRequest } from 'core/utils/api';

const FETCH = 'blog/details/FETCH';
const initialState = {};

export const fetch = (slug: string) => apiRequest(FETCH, `/proxy/blog/singleblog/${slug}/0`);

export default handleActions({
  [FETCH]: (state, { payload }) => payload || initialState,
}, initialState);


const getDetails = (state: RootState) => state.blog.details;
export const selectors = {
  getDetails,
};
