import Wall from './wall/indexContainer';
import Page from './shared/components/PageContainer';
import Images from './images';
import Video from './video';
import Questions from './questions/indexContainer';
import Reviews from './reviews/indexContainer';
import ReviewsForm from './reviews/FormContainer';

export default {
  path: '/ink(/:username)',
  component: Page,
  indexRoute: { component: Wall },
  childRoutes: [
    { path: 'photos', component: Images },
    { path: 'video', component: Video },
    { path: 'questions', component: Questions },
    { path: 'reviews', components: { children: Reviews, append: ReviewsForm } },
  ],
};
