import { combineReducers } from 'redux';
import track, * as trackActions from './track';
import post, * as postActions from './post';
import comments, * as commentsActions from './comments';
import url, * as urlActions from './url';
import * as allSelectors from './selectors';

export const actions = {
  ...trackActions,
  ...postActions,
  ...commentsActions,
  ...urlActions,
};

export const selectors = allSelectors;

export default combineReducers({
  track,
  post,
  comments,
  url,
});
