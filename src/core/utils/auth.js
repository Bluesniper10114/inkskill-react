import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import withProps from 'recompose/withProps';
import { withRouter } from 'react-router';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { selectors as auth, updateAuth, logout } from 'core/state/auth';
import store from 'core/state';

export const privateAction = action => (...args) => {
  const userId = auth.getCurrentUserId(store.getState());

  if (!userId) {
    alert('Only for authorized users. Sorry! :/');
    return {
      type: 'auth/@forbidden',
    };
  }

  return action(...args);
};

export const withAuth = compose(
  connect(
    auth.getAuth,
    { updateAuth, logout },
  ),
  withProps(props => ({
    isAuthenticated: !!props.auth._id,
  }))
);

export const withUsername = compose(
  withRouter,
  withAuth,
  withProps(({ params, auth: user }) => ({
    username: params.username || user.username,
  }))
);

export const onlyAuthorized = compose(
  connect(
    (state, ownProps) => {
      if (ownProps.auth) return { auth: ownProps.auth };

      return auth.getAuth(state);
    },
    dispatch => ({
      redirectLogin: () => dispatch(push('/login')),
    })),
  lifecycle({
    componentDidMount() {
      const props = this.props;

      if (!props.auth._id && !props.auth.loading) {
        props.redirectLogin();
        console.log(props);
        console.warn('redirect to login when mount');
      }
    },
    componentWillReceiveProps(nextProps) {
      const { redirectLogin } = this.props;

      if (!nextProps.auth._id) {
        redirectLogin();
        console.warn('redirect to login when receive');
      }
    },
  })
);
