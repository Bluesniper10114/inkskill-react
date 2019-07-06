import React from 'react';
import classNames from 'classnames';
import { graphql, compose } from 'react-apollo';
import FollowMutation from 'core/graphql/Follow.graphql';

const FollowButtons = ({ className, profile, toggle }) => (
  <div className={classNames('group-inline small-btn-group', className)}>
    {profile.stats.isFollowing
      ? <button className="btn btn-gray" onClick={toggle}>UNFOLLOW</button>
      : <button className="btn btn-danger" onClick={toggle}>FOLLOW</button>
    }
  </div>
);

export default compose(
  graphql(FollowMutation, {
    props: ({ mutate, ownProps }) => {
      const { profile } = ownProps;
      const id = profile._id;
      const follow = !profile.stats.isFollowing;

      return ({
        toggle: () => mutate({ variables: { id, follow } }),
      });
    },
  }),
)(FollowButtons);
