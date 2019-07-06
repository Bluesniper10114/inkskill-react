/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Link } from 'core/components';
import Page from 'core/components/PublicPage';
import Spacer from 'core/components/Spacer';
import HeroTitle from 'core/components/HeroTitle';
import ResetForm from './ResetFormContainer';

import { connect } from 'react-redux';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import withProps from 'recompose/withProps';
import { checkResetToken, resendVerificationCode } from 'core/state/auth';
import { withAuth } from 'core/utils/auth';
import withLoading from 'core/utils/loading';
import switcher from 'core/utils/switcher';
import { getProfileUrl } from 'core/utils/profile';

const Form = ({ params }) => (
  <Page showCreate={false}>
    <HeroTitle className="sign-up">Reset Password</HeroTitle>
    <Spacer type="tall" />
    <ResetForm
      params={params}
    />
    <Spacer />
    <div className="container text-center">
      <Link to="/login">LogIn</Link>
    </div>
    <Spacer type="tall" />
  </Page>
);

const ResetSuccess = ({ auth }) => (
  <div className="error-screen">
    <h1>Your password has just been reset. You have been logged in with your new password.</h1>
    <p>
      <Link to={getProfileUrl(auth)}>Go to the profile page</Link>
    </p>
  </div>
);

const InvalidToken = ({ error }) => (
  <div className="error-screen">
    <h1>{error.error}</h1>
    <p>
      Token is invalid or has expired.
    </p>
  </div>
);

const getType = ({ error, auth }) => {
  if (error) return error.type;
  if (auth && auth.username && !auth.deleted) return 'active';
  return null;
};

const Index = switcher(getType, {
  invalid_token: InvalidToken,
  active: ResetSuccess,
  default: Form,
});

export default compose(
  connect(null, { checkResetToken, resend: resendVerificationCode }),
  withAuth,
  withState('loading', 'setLoading', ({ params }) => params && params.token),
  withState('error', 'setError', null),
  withState('hasSent', 'setSent', false),
  withProps(({ params }) => ({
    params,
  })),
  withHandlers({
    resendCode: ({ resend, setError, setSent }) => (event) => {
      event.preventDefault();
      resend()
        .then(() => setSent(true))
        .catch(error => setError(error));
    },
  }),
  lifecycle({
    componentDidMount() {
      const { params, checkResetToken: checkToken, setError, setLoading } = this.props;

      if (!params.token) return;

      checkToken(params.token)
        .then(() => setLoading(false))
        .catch((error) => {
          setLoading(false);
          return setError(error);
        });
    },
  }),
  withLoading(),
)(Index);
