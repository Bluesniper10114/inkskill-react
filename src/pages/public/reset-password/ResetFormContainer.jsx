import { connect } from 'react-redux';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import { resetSubmit, facebookLogin } from 'core/state/auth';
import { form } from 'core/modules/form';
import ResetForm from './ResetForm';

export default compose(
  connect(null, { onFacebook: facebookLogin }),
  withProps(({ params }) => ({
    params,
  })),
  form({
    form: 'reset',
    rules: {
      password: ['required', 'length:6'],
      confirm: ['required', 'length:6'],
    },
    handleSubmit: resetSubmit,
  })
)(ResetForm);
