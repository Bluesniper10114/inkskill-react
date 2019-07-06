// @flow

import { handleActions } from 'redux-actions';
import { apiRequest } from 'core/utils/api';

const FEATURED = 'blog/list/FEATURED';

const initialState = [];

export const fetchFeatured = () => apiRequest(FEATURED, '/proxy/blog/featured');

export default handleActions({
  [FEATURED]: (state, { payload }) => (payload && payload.blogs) || state,
}, initialState);


export const getFeatured = (state: RootState) => state.blog.featured;
