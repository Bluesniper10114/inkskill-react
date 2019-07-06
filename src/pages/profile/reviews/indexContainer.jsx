import compose from 'recompose/compose';
import withLoading from 'core/utils/loading';
import { withProfile } from '../shared/utils';
import Index from './index';

export default compose(
  withProfile(),
  withLoading(),
)(Index);
