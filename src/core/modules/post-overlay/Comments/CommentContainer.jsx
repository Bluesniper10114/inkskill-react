import { connect } from 'react-redux';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import withState from 'recompose/withState';
import { likeComment, unlikeComment } from '../state/comments';
import Comment from './Comment';

export default compose(
  connect(null, { like: likeComment, unlike: unlikeComment }),
  withState('reply', 'showReply', false),
  withHandlers({
    onLike: ({ data, like, unlike }) => () => (data.is_liked ? unlike(data.id) : like(data.id)),
    onReply: ({ reply, showReply }) => () => showReply(!reply),
  }),
)(Comment);

