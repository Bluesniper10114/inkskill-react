// @flow

import axios from 'axios';
import assign from 'lodash/assign';
import get from 'lodash/get';
import { API_BASE_URL } from 'core/config/env';


type ActionFunc = (any) => Action;
type APIActions = {
  [key: string]: ActionFunc
};

const createApiActions = (type: string): APIActions => ({
  success: (data): Action => ({ type, payload: data }),
  failure: (error: Error) => ({ type, error }),
  pending: (): Action => ({ type }),
});

const metaMaker = (options: Options) => (done: boolean): { meta: ActionMeta } => ({
  meta: {
    http: {
      done,
      url: typeof options === 'object' ? options.url : options,
    },
  },
});

export const getApiUrl = (path: string) => `${API_BASE_URL}${path}`;

export const request = (axiosOptions: any) => axios(axiosOptions)
  .then(res => res.data)
  .catch((err) => {
    console.warn(err); // eslint-disable-line

    const error = err.response ? err.response : err;
    throw error.data;
  });

export const apiRequestMiddleware = (selector: Function) =>
  (store: Object) => (next: Function) => (action: ActionWithMeta) => {
    const done = get(action, 'meta.http.done', false);

    if (done) {
      const requests = selector(store.getState());
      if (requests[action.meta.http.url]) {
        return;
      }
    }

    return next(action); // eslint-disable-line
  };

export const asyncSequence = (action: Function, items: any[]) =>
  items.reduce((promise, item) => promise.then(() => action(item)), Promise.resolve());

// TODO think about more usable interface
// TODO cache data with long life time (don't forget about TTL option)
export const apiRequest = (actionType: string, options: Options) =>
  (dispatch: Function) => {
    const actions = createApiActions(actionType);
    const makeMeta = metaMaker(options);
    const pendingAction = assign(actions.pending(), makeMeta(false));

    if (!dispatch(pendingAction)) {
      return new Promise(resolve => resolve(false)); // TODO: return promise of a pending request
    }

    return request(options)
      .then((data) => {
        const successAction = assign(actions.success(data), makeMeta(true));
        dispatch(successAction);

        return data;
      })
      .catch((error) => {
        const failureAction = assign(actions.failure(error), makeMeta(true));
        dispatch(failureAction);
        throw error;
      });
  };
