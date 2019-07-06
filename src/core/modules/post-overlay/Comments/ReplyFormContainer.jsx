import { connect } from 'react-redux';
import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import { actions } from '../state';
import ReplyForm from './ReplyForm';

export default compose(
  connect(null, { reply: actions.reply }),
  withState('message', 'setMessage', ''),
  withHandlers({
    onChange: ({ setMessage }) => ({ target }) => setMessage(target.value),
    onSubmit: ({ commentId, message, onClose, reply }) => () => {
      reply(commentId, message);
      onClose();
    },
  })
)(ReplyForm);
