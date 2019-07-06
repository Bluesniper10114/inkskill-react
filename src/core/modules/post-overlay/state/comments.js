/* eslint-disable */

import update from 'immutability-helper';
import { handleActions, createAction } from 'redux-actions';
import { privateAction } from 'core/utils/auth';
import { selectors } from 'core/state/auth';
import findIndex from 'lodash/findIndex';
import random from 'lodash/random';

const action = name => `post-overlay/comments/${name}`;
const initialState = [];

const SET = action('SET');
export const CREATE = action('CREATE');
const UPDATE = action('UPDATE');
const DELETE = action('DELETE');
const LIKE = action('LIKE');
const UNLIKE = action('UNLIKE');
const REPLY = action('REPLY');


export const setComments = createAction(SET);
export const likeComment = privateAction(createAction(LIKE));
export const unlikeComment = privateAction(createAction(UNLIKE));

export const addComment = (message) => (dispatch, getState) => {
  const { auth } = selectors.getAuth(getState());
  const user = {
    id: auth.id,
    username: auth.username,
    role: auth.role,
    name: `${auth.first_name} ${auth.last_name}`,
    avatar: auth.avatar,
  };

  const payload = {
    id: random(),
    comment: message,
    created: (new Date).toISOString(),
    isLiked: false,
    likesNum: 0,
    repliesNum: 0,
    user,
  };

  dispatch({
    type: CREATE,
    payload
  })
};

export const reply = privateAction((id, message) => ({
  type: REPLY,
  payload: { id, message },
}));

export default handleActions({
  [SET]: (state, { payload }) => payload || state,
  [CREATE]: (state, { payload }) => update(state, {
    $push: [payload],
  }),
  [LIKE]: (state, { payload }) => {
    const index = findIndex(state, { id: payload });
    const prevItem = state[index];

    return update(state, {
      [index]: {
        isLiked: { $set: true },
        likesNum: { $set: prevItem.likesNum + 1 }
      }
    });
  },
  [UNLIKE]: (state, { payload }) => {
    const index = findIndex(state, { id: payload });
    const prevItem = state[index];

    return update(state, {
      [index]: {
        isLiked: { $set: false },
        likesNum: { $set: prevItem.likesNum - 1 }
      }
    });
  },
  [REPLY]: (state, { payload }) => {
    const index = findIndex(state, { id: payload.id });
    const prevItem = state[index];

    return update(state, {
      [index]: { repliesNum: { $set: prevItem.repliesNum + 1 } }
    });
  },
}, initialState);
