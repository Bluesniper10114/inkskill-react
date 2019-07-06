import assign from 'lodash/assign';
import omit from 'lodash/omit';
import snakeCase from 'lodash/snakeCase';
import { createSelector } from 'reselect';

export default (state = {}, { meta }) => {
  if (!meta || !meta.http || !meta.http.url) {
    return state;
  }

  const key = snakeCase(meta.http.url);

  if (meta.http.done) {
    return omit(state, key);
  }

  return assign({}, state, {
    [key]: true,
  });
};

const getRequests = createSelector(
  state => state.requests,
  value => value
);

export const selectors = {
  getRequests,
};
