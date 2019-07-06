import { ApolloClient, createNetworkInterface } from 'react-apollo';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { API_BASE_URL } from 'core/config/env';
import logger from 'redux-logger'; // eslint-disable-line
import { apiRequestMiddleware } from '../utils/api';
import requests, { selectors } from './requests';
import auth, { checkLogin } from './auth';
import modulesReducers from '../modules';
import site from '../../pages/public/shared/state';
import blog from '../../pages/blog/shared/state';
import profile from '../../pages/profile/shared/state';
import { googleAnalytics } from '../utils/reactGAMiddleware';
import {GOOGLE_ANALYTICS} from "../config/env";

const networkInterface = createNetworkInterface({
  uri: `${API_BASE_URL}/graphql`,
  opts: {
    credentials: 'same-origin',
  },
});

export const client = new ApolloClient({ networkInterface });

const middleware = [
  apiRequestMiddleware(selectors.getRequests),
  thunkMiddleware,
  routerMiddleware(browserHistory),
  client.middleware(),
  logger({
    timestamp: false,
    duration: false,
    collapsed: true,
    diff: true,
  }),
];

if (GOOGLE_ANALYTICS) {
  middleware.push(googleAnalytics);
}

const reducers = combineReducers({
  ...modulesReducers,
  auth,
  requests,
  site,
  blog,
  profile,
  routing: routerReducer,
  apollo: client.reducer(),
});

export const initApp = () => (dispatch) => {
  dispatch(checkLogin());
};

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__; // eslint-disable-line
const composeEnhancers = (reduxDevTools || compose);
export default createStore(reducers, {}, composeEnhancers(
  applyMiddleware(...middleware),
));

