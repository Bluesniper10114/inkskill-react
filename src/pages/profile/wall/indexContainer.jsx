import { connect } from 'react-redux';
import { selectors } from '../shared/state/data';
import Index from './index';


export default connect(
  selectors.getProfile,
)(Index);
