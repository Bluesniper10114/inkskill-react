import Bio from './Bio';
import pick from 'lodash/pick';
import compose from 'recompose/compose';
import { withAuth } from 'core/utils/auth';
import { form } from 'core/modules/form';

export default compose(
  withAuth,
  form({
    form: 'sign_up_bio',
    autoSubmit: event => event === 'blur',
    data: ({ auth }) => pick(auth, 'bio'),
    rules: {
      bio: ['required', 'length:0,250'],
    },
  })
)(Bio);
