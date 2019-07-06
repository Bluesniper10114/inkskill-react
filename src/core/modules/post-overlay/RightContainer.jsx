import { connect } from 'react-redux';
import { likeComment } from './state/comments';
import { getRightSide } from './state/selectors';
import Right from './Right';

export default connect(getRightSide, { likeComment })(Right);
