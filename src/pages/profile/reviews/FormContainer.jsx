import compose from 'recompose/compose';
import branch from 'recompose/branch';
import renderNothing from 'recompose/renderNothing';
import { withReviewTags, withReviewsCreate } from '../shared/utils';
import { form } from 'core/modules/form';
import withLoading from 'core/utils/loading';
import Form from './Form';

export default compose(
  withReviewTags,
  withReviewsCreate,
  withLoading(),
  branch(props => props.isOwner || !props.isArtist, renderNothing),
  form({
    form: 'create_review',
    data: {
      title: null,
      description: null,
      stars: 3,
      tags: [],
    },
    instantValidation: true,
    autoClear: true,
    rules: {
      title: ['required', 'length:3'],
      description: ['required', 'length:20'],
    },
  })
)(Form);
