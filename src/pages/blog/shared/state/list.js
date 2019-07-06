// @flow

import { createSelector } from 'reselect';
import { handleActions } from 'redux-actions';
import { apiRequest } from 'core/utils/api';
import { selectors as infoSelectors } from './info';

const FETCH = 'blog/list/FETCH';

const initialState = [];

export const fetch = () => apiRequest(FETCH, '/proxy/blog/blog');

export default handleActions({
  [FETCH]: (state, { payload }) => (payload && payload.blogs) || state,
}, initialState);


export const getList = (state: RootState) => state.blog.list;
export const selectors = {
  getList: createSelector(
    getList,
    infoSelectors.getInfo,
    (list, info) => ({
      list,
      info,
    })
  ),
};
