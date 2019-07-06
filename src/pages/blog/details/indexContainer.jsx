// @flow

import { connect } from 'react-redux';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import loading from 'core/utils/loading';
import { selectors, fetch as fetchDetails } from '../shared/state/details';
import Index from './index';

const withLoader = loading(({ blog }) => (!blog))(Index);

export default compose(
  connect(selectors.getDetails, { fetchDetails }),
  lifecycle({
    componentDidMount() {
      this.props.fetchDetails(this.props.params.slug);
    },
  })
)(withLoader);
