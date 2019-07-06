import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { scrollToTop } from 'core/utils/dom';
import store, { client } from './core/state';
import routes from './core/routes';
import ReactGA from 'react-ga';
import { GOOGLE_ANALYTICS } from 'core/config/env';

import './core/config/axios';
import './assets/scss/style.scss';

if (GOOGLE_ANALYTICS) {
  ReactGA.initialize(GOOGLE_ANALYTICS, { debug: true });
}

const history = syncHistoryWithStore(browserHistory, store);
history.listen(scrollToTop);

render(
  <ApolloProvider store={store} client={client}>
    <Router history={history} routes={routes} />
  </ApolloProvider>,
  document.getElementById('root')
);
