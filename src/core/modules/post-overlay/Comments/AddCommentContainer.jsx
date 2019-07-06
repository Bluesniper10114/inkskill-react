import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import AddCommentMutation from 'core/graphql/AddComment.graphql';
import PostQuery from 'core/graphql/Post.graphql';
import AddComment from './AddComment';
import { getCommentForm } from '../state/selectors';
import { setFocus } from '../state/post';

// workaround for storing input ref
let inputRef;

export default compose(
  connect(getCommentForm, { setFocus }),
  withState('ref', 'setRef', null),
  withState('comment', 'setComment', ''),
  graphql(AddCommentMutation, {
    options: ({ post }) => ({
      update: (proxy, { data }) => {
        const queryData = proxy.readQuery({
          query: PostQuery,
          variables: { id: post.post },
        });

        queryData.post.comments.push(data.addComment);
        proxy.writeQuery({ query: PostQuery, data: queryData });
      },
    }),
  }),
  withHandlers({
    onChange: ({ setComment }) => ({ target }) => setComment(target.value),
    onSubmit: ({ comment, post, mutate, setComment }) => (event) => {
      event.preventDefault();
      mutate({ variables: { comment, id: post._id } })
        .then(() => setComment(''));
    },
    updateRef: () => (input) => {
      inputRef = input;
    },
  }),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      if (nextProps.focusComment) {
        nextProps.setFocus(false);
        inputRef.focus();
      }
    },
  })
)(AddComment);
