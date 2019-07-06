// @flow

import { handleActions } from 'redux-actions';
import { apiRequest } from 'core/utils/api';

const FETCH = 'site/about/FETCH';
const initialState: AboutState = {};

export const fetch = () => apiRequest(FETCH, '/web/getaboutpage');
export default handleActions({
  [FETCH]: (state, { payload }) => payload || state,
}, initialState);


const getAbout = (state: RootState): AboutState => state.site.about;
export const selectors = {
  getAbout,
};
