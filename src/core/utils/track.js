import { connect } from 'react-redux';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import keyBy from 'lodash/keyBy';
import { actions as overlay } from 'core/modules/post-overlay';

export const linkSiblings = posts => posts.map((post, index) => {
  let prev = posts[index - 1];
  let next = posts[index + 1];
  const last = posts.length - 1;

  if (index === 0) {
    prev = posts[last];
  } else if (index === last) {
    next = posts[0];
  }

  return ({
    ...post,
    prev: prev && prev.post,
    next: next && next.post,
  });
});

export const withTrack = selector => compose(
  connect(null, { setTrack: overlay.setTrack }),
  lifecycle({
    componentWillReceiveProps(props) {
      const posts = selector(props);

      if (posts) {
        const linkedPosts = linkSiblings(posts);
        this.props.setTrack(keyBy(linkedPosts, 'post'));
      }
    },
    componentWillUnmount() {
      this.props.setTrack({});
    },
  })
);
