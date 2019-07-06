import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { selectors, fetch } from '../shared/state/about';
import loading from 'core/utils/loading';
import Index from './index';

const withLoader = loading(({ aboutpage }) => !aboutpage)(Index);

export default compose(
  connect(selectors.getAbout, { fetch }),
  lifecycle({
    componentDidMount() {
      this.props.fetch();
    },
  })
)(withLoader);
