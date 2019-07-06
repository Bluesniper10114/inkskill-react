import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import { connect } from 'react-redux';
import { withLike } from 'core/utils/posts';
import { withModal } from 'core/modules/modal';
import { actions } from './state';
import Left from './Left';

export default compose(
  withLike,
  withModal('post-likes'),
  withHandlers({
    onLikesClick: ({ post, onLike /* , onModal */ }) => () => {
      const { likes } = post.stats;

      if (likes === 0) {
        onLike(1);
      } else if (likes === 1 && post.likeType) {
        onLike(0);
      } else {
        // onModal({ postId: post.post });
      }
    },
  }),
  connect(null, {
    onLike: actions.like,
    onCommentsClick: flag => actions.setFocus(!!flag),
  }),
)(Left);
