import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import withProps from 'recompose/withProps';
import lifecycle from 'recompose/lifecycle';
import pure from 'recompose/pure';
import withKeyboard, { ARROWS } from 'core/utils/keyboard';
import PostQuery from 'core/graphql/Post.graphql';
import { actions } from './state';
import Overlay from './Overlay';

const getArrows = ({ postId, track = {} }) => {
  const trackItem = track[postId] || {};
  const prevId = trackItem.prev;
  const nextId = trackItem.next;

  return { prevId, nextId };
};

export default compose(
  pure,
  connect(null, {
    load: actions.load,
    unload: actions.restoreUrl,
  }),
  withState('postId', 'setPostId', props => props.id),
  graphql(PostQuery, {
    options: props => ({
      variables: {
        id: props.postId,
      },
    }),
    props: ({ data, ownProps }) => ({
      post: data.post,
      loading: data.loading,
      loadPost: (id) => {
        ownProps.load(id);
        ownProps.setPostId(id);
        data.refetch({ id });
      },
    }),
  }),
  withState('arrows', 'setArrows', {}),
  withProps(props => ({
    arrows: getArrows(props),
  })),
  withHandlers({
    onPrev: ({ arrows, loadPost }) => () => arrows.prevId && loadPost(arrows.prevId),
    onNext: ({ arrows, loadPost }) => () => arrows.nextId && loadPost(arrows.nextId),
  }),
  withKeyboard((key, { onPrev, onNext }) => {
    if (key === ARROWS.LEFT) {
      onPrev();
    } else if (key === ARROWS.RIGHT) {
      onNext();
    }
  }),
  lifecycle({
    componentWillMount() {
      const { id, load, updateUrl } = this.props;
      if (updateUrl) load(id);
    },
    componentWillUnmount() {
      const { unload, updateUrl } = this.props;
      if (updateUrl) unload();
    },
  })
)(Overlay);
