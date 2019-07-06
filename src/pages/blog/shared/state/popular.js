// @flow

import { handleActions } from 'redux-actions';
import { apiRequest } from 'core/utils/api';

const POPULAR = 'blog/list/POPULAR';

const initialState = [];

export const fetchPopular = () => apiRequest(POPULAR, '/proxy/blog/popular');

export default handleActions({
  [POPULAR]: (state, { payload }) => (payload && payload.blogs) || state,
}, initialState);


export const getPopular = (state: RootState) => state.blog.popular;
