import List from './list/indexContainer';
import Details from './details/indexContainer';

export default {
  path: '/blog',
  indexRoute: { component: List },
  childRoutes: [
    { path: ':slug', component: Details },
  ],
};
