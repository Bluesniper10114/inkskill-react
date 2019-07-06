import compose from 'recompose/compose';
import withLoading from 'core/utils/loading';
import { withProfile } from '../shared/utils';
import ProfileQuestionsQuery from '../shared/graphql/Questions.graphql';
import Index from './index';

export default compose(
  withProfile(ProfileQuestionsQuery),
  withLoading()
)(Index);
