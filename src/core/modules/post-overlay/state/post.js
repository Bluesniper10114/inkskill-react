import update from 'immutability-helper';
import { handleActions, createAction } from 'redux-actions';
import { privateAction } from 'core/utils/auth';
import { getPostUrl } from 'core/utils/posts';
import { setUrl } from './url';
import { CREATE as CREATE_COMMENT } from './comments';
import { getPost } from './selectors';

const FETCH = 'post-overlay/post/FETCH';
const LIKE = 'post-overlay/post/LIKE';
const FOCUS = 'post-overlay/post/FOCUS';
const SHARING = 'post-overlay/post/SHARING';
const FULL_SCREEN = 'post-overlay/post/FULL_SCREEN';
const initialState = {
  fullScreen: false,
  sharing: false,
  focusComment: false,
};

export const setLike = createAction(LIKE);
export const setFocus = createAction(FOCUS);
export const setSharing = createAction(SHARING);
export const setFullScreen = createAction(FULL_SCREEN);
export const load = id => (dispatch) => {
  dispatch(setSharing(false));
  dispatch(setFullScreen(false));
  dispatch(setUrl(getPostUrl(id)));
};
export const like = privateAction(type => (dispatch, getState) => {
  const state = getState();
  const image = getPost(state);
  const isLike = image.emoType !== type;
  const payload = {
    isLiked: isLike,
    emoType: isLike ? type : 0,
    likesNum: image.isLiked === isLike ? image.likesNum : image.likesNum + (isLike ? 1 : -1),
  };

  dispatch(setLike(payload));
});


export default handleActions({
  [FETCH]: (state, { payload }) => payload || state,
  [SHARING]: (state, { payload }) => update(state, { sharing: { $set: payload } }),
  [FULL_SCREEN]: (state, { payload }) => update(state, { fullScreen: { $set: payload } }),
  [CREATE_COMMENT]: state => update(state, {
    commentsNum: { $set: state.commentsNum + 1 },
  }),
  [FOCUS]: (state, { payload }) => update(state, { focusComment: { $set: payload } }),
  [LIKE]: (state, { payload }) => update(state, {
    likesNum: { $set: payload.likesNum },
    isLiked: { $set: payload.isLiked },
    emoType: { $set: payload.emoType },
  }),
}, initialState);
