/* eslint-disable jsx-a11y/href-no-hash */

import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import { verify, resendVerificationCode } from 'core/state/auth';
import { withAuth, onlyAuthorized } from 'core/utils/auth';
import { getProfileUrl } from 'core/utils/profile';
import withLoading from 'core/utils/loading';
import switcher from 'core/utils/switcher';
import { Link } from 'core/components';

const WaitForVerification = ({ hasSent, resendCode }) => (
  <div className="error-screen">
    <h1>Your profile is not yet activated.</h1>
    {hasSent
      ? (
        <p>
          A verification link has been sent to your email address.
          Please allow up to 2 minutes for it to arrive in your inbox.
        </p>
      )
      : (
        <p>
          You will need to click on the link in the verification email. {' '}
          <a href="#" onClick={resendCode}>Click here</a> to generate another verification email.
        </p>
      )
    }
  </div>
);

const AlreadyVerified = ({ auth }) => (
  <div className="error-screen">
    <h1>Already Verified</h1>
    <p>
      Your profile is already activated.
      <Link to={getProfileUrl(auth)}>Go to the profile page</Link>
    </p>
  </div>
);

const InvalidLink = ({ error }) => (
  <div className="error-screen">
    <h1>{error.error}</h1>
    <p>
      Link expired or inactive.
    </p>
  </div>
);

const getType = ({ error, auth }) => {
  if (error) return error.type;
  if (auth.isVerified) return 'verified';

  return null;
};

const Verify = switcher(getType, {
  verified: AlreadyVerified,
  invalid_url: InvalidLink,
  default: onlyAuthorized(WaitForVerification),
});

export default compose(
  connect(null, { verify, resend: resendVerificationCode }),
  withAuth,
  withState('loading', 'setLoading', ({ params }) => params && params.code),
  withState('error', 'setError', null),
  withState('hasSent', 'setSent', false),
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
      const { params, verify: verifyCode, setError, setLoading } = this.props;

      if (!params.code) return;

      verifyCode(params.code)
        .then(() => setLoading(false))
        .catch((error) => {
          setLoading(false);
          return setError(error);
        });
    },
  }),
  withLoading(),
)(Verify);
