import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withRouter } from 'react-router';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import { register, facebookLogin } from 'core/state/auth';
import { form } from 'core/modules/form';
import SignUpForm from './SignUpForm';

export default compose(
  connect(null, { onFacebook: facebookLogin }),
  withRouter,
  withState('viaEmail', 'setVisibility', ({ params }) => !!params.role),
  withHandlers({
    toggleVisibility: ({ viaEmail, setVisibility }) =>
      () => setVisibility(!viaEmail),
  }),
  form({
    form: 'sign_up',
    data: ({ params }) => Object.assign(
      { gender: 'male' },
      { role: params.role || 'artist' },
    ),
    instantValidation: true,
    rules: {
      role: ['required', 'oneOf:artist,enthusiast'],
      email: ['required', 'email'],
      gender: ['required', 'oneOf:male,female'],
      username: ['required', 'length:3,20'],
      password: ['required', 'length:6', 'related:passwordConfirm'],
      passwordConfirm: ['required', 'length:6', 'equal:password'],
    },
    handleSubmit: register,
  })
)(SignUpForm);
