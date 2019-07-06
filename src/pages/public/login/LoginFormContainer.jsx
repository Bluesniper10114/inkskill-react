import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { login, facebookLogin } from 'core/state/auth';
import { form } from 'core/modules/form';
import LoginForm from './LoginForm';

export default compose(
  connect(null, { onFacebook: facebookLogin }),
  form({
    form: 'login',
    rules: {
      username: ['required', 'length:3'],
      password: ['required', 'length:6'],
    },
    handleSubmit: login,
  })
)(LoginForm);
