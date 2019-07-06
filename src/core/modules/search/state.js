import { handleActions, createAction } from 'redux-actions';
import { createSelector } from 'reselect';
import { push } from 'react-router-redux';
import { request } from 'core/utils/api';

const CLEAR = 'search/CLEAR';
const CHANGE = 'search/CHANGE';
const RESULTS = 'search/RESULTS';
const SUGGESTIONS = 'search/SUGGESTIONS';
const initialState = {
  term: '',
  suggestions: [],
  results: null,
};

const setResults = createAction(RESULTS);
const setSuggestions = createAction(SUGGESTIONS);
export const clear = createAction(CLEAR);
export const change = createAction(CHANGE);

export const preSearch = term => dispatch => request(`/web/searchartist/${term}`)
  .then(result => dispatch(setSuggestions(result.artistname)));

const buildQueryString = ({ artist_name, ...params }) => {
  const newParams = { q: artist_name, ...params };
  return Object
    .keys(newParams)
    .map(key => `${key}=${newParams[key]}`).join('&');
};

export const search = (params, page = 1) => (dispatch) => {
  dispatch(push(`/search?${buildQueryString(params)}`));

  return request({
    url: `/web/search/${page}`,
    method: 'POST',
    params,
  }).then((response) => {
    dispatch(setResults(response));
  });
};

export default handleActions({
  [CLEAR]: state => ({ ...state, results: [], suggestions: [] }),
  [CHANGE]: (state, { payload }) => ({ ...state, term: payload }),
  [RESULTS]: (state, { payload }) => ({ ...state, results: payload }),
  [SUGGESTIONS]: (state, { payload }) => ({
    ...state,
    suggestions: payload || [],
  }),
}, initialState);

const getSearchField = createSelector(
  state => state.search,
  ({ term, suggestions }) => ({
    term,
    suggestions: suggestions.map((user, id) => ({ id, label: user.name })),
  }),
);

export const selectors = {
  getSearchField,
};
