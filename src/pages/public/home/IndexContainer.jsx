import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import keyBy from 'lodash/keyBy';
import loading from 'core/utils/loading';
import { linkSiblings } from 'core/utils/track';
import { actions as overlay } from 'core/modules/post-overlay';
import { selectors, fetch } from '../shared/state/home';
import Index from './index';
import LatestPosts from '../shared/LatestPosts.graphql';
import { browserHistory } from 'react-router';


const withLoader = loading(({ blog, posts }) => !blog || !posts.length)(Index);

export default compose(
  connect(selectors.getHome, { fetch, setTrack: overlay.setTrack }),
  graphql(LatestPosts, {
    props: ({ data }) => ({
      posts: linkSiblings(data.latestPosts || []),
    }),
  }),
  lifecycle({
    componentWillMount() {
      browserHistory.push('/blog');
    },
    componentDidMount() {
      this.props.fetch();
    },
    componentWillReceiveProps({ posts }) {
      if (posts) {
        this.props.setTrack(keyBy(posts, 'post'));
      }
    },
    componentWillUnmount() {
      this.props.setTrack({});
    },
  })
)(withLoader);
