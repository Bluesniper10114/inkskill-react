import branch from 'recompose/branch';
import renderComponent from 'recompose/renderComponent';
import FollowButtons from 'core/components/FollowButtons';
import EditButtons from './EditButtons';

export default branch(
  ({ isOwn }) => isOwn,
  renderComponent(EditButtons),
)(FollowButtons);
