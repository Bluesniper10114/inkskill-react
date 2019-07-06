import store, { initApp } from 'core/state';
import App from '../components/App';
import NotFound from '../components/NotFound';
import site from '../../pages/public/routes';
import blog from '../../pages/blog/routes';
import search from '../../pages/search/routes';
import feed from '../../pages/news-feed/routes';
import profile from '../../pages/profile/routes';

const notFound = {
  path: '*',
  component: NotFound,
};

export default {
  path: '/',
  component: App,
  onEnter: () => store.dispatch(initApp()),
  childRoutes: [
    site,
    blog,
    search,
    feed,
    profile,
    notFound,
  ],
};
