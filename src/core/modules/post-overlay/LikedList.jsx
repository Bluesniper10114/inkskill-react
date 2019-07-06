import React from 'react';
import find from 'lodash/find';
import Tooltip from 'rc-tooltip';
import { graphql } from 'react-apollo';
import LikeStatsQuery from 'core/graphql/LikeStats.graphql';
import { LIKE_TYPES } from 'core/constants';
import 'rc-tooltip/assets/bootstrap.css';

const LikedList = ({ type, total, recent }) => (
  <ul className="liked-list">
    <li><strong>{LIKE_TYPES[type]}</strong></li>
    {recent.map((user, index) => (
      <li key={index}>{user.name}</li>
    ))}
    {total > recent.length && <li>and {total - recent.length} more...</li>}
  </ul>
);

const Component = ({ loading, stats, children }) => (
  <Tooltip
    overlayClassName={stats ? '' : 'hidden'}
    placement="bottom"
    mouseLeaveDelay={0}
    overlay={loading || !stats
      ? 'Loading...'
      : <LikedList
        type={stats.type}
        total={stats.total}
        recent={stats.recentPeople}
      />
    }
  >
    {children}
  </Tooltip>
);

export default graphql(LikeStatsQuery, {
  options: props => ({
    variables: {
      postId: props.postId,
    },
  }),
  props: ({ data, ownProps }) => ({
    stats: !data.loading && find(data.post.likeStats, { type: ownProps.type }),
    loading: data.loading,
  }),
})(Component);
