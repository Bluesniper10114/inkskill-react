import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { forgotSubmit, facebookLogin } from 'core/state/auth';
import { form } from 'core/modules/form';
import ForgotForm from './ForgotForm';

export default compose(
  connect(null, { onFacebook: facebookLogin }),
  form({
    form: 'forgot',
    rules: {
      email: ['required', 'length:3'],
    },
    handleSubmit: forgotSubmit,
  })
)(ForgotForm);
