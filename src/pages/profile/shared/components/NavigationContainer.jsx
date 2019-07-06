import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withRouter } from 'react-router';
import { selectors } from '../state/data';
import Navigation from './Navigation';

export default compose(
  withRouter,
  connect(
    selectors.getNavigation,
  )
)(Navigation);
