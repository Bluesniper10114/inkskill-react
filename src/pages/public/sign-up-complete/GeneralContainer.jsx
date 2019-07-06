import General from './General';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import compose from 'recompose/compose';
import { form } from 'core/modules/form';
import { withAuth } from 'core/utils/auth';

export default compose(
  withAuth,
  form({
    form: 'sign_up_general',
    data: ({ auth }) => pick(auth, ['role', 'username', 'name', 'location', 'gender']),
    rules: {
      role: ['required', 'oneOf:artist,enthusiast'],
      username: ['required', 'length:3,20'],
      name: ['required', 'length:3,30'],
      location: ['required'],
    },
    beforeSubmit: data => omit(data, 'gender'),
    autoSubmit: (event, name) =>
      event === 'blur' || (event === 'change' && name === 'role'),
  })
)(General);
