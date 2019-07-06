import update from 'immutability-helper';
import findIndex from 'lodash/findIndex';
import { createAction, handleActions } from 'redux-actions';
import { LOCATION_CHANGE } from 'react-router-redux';

const SHOW = 'modal/SHOW';
const HIDE = 'modal/HIDE';

export const hide = createAction(HIDE);
export const show = createAction(SHOW);

const initialState = [];

export default handleActions({
  [SHOW]: (state, { payload }) => update(state, { $push: [payload] }),
  [HIDE]: (state, { payload }) => {
    if (!payload) {
      return update(state, { $splice: [[state.length - 1, 1]] });
    }

    const index = findIndex(state, { id: payload });
    return update(state, { $splice: [[index, 1]] });
  },
  [LOCATION_CHANGE]: () => initialState,
}, initialState);
