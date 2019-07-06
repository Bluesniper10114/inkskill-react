import React from 'react';
import { graphql, compose } from 'react-apollo';
import Popover from 'react-bootstrap/lib/Popover';
import Overlay from 'react-bootstrap/lib/Overlay';
import ProfileByIdQuery from 'core/graphql/ProfileById.graphql';
import { withAuth } from 'core/utils/auth';
import { getLocationString } from 'core/utils/profile';
import ProfileUrls from 'core/components/ProfileUrls';
import FollowButtons from 'core/components/FollowButtons';

const UserInfo = ({ profile, isOwner }) => (
  <div className="profile-box text-center">
    <div className="credential-box">
      <h5 className="name">{profile.name}</h5>
      <span className="origin">{getLocationString(profile.location)}</span>
      <ProfileUrls urls={profile.urls} />
    </div>
    <div className="bio-box text-center">
      <p>{profile.bio}</p>
    </div>
    {!isOwner && <FollowButtons className="group-block" profile={profile} />}
  </div>
);

const UserPopover = ({ target, profile, isOwner, loading, onEnter }) => (
  <Overlay
    show
    placement="top"
    target={target}
    onEnter={onEnter}
  >
    <Popover className="user-popover" id="user-popover">
      {loading ? 'Loading...' : <UserInfo profile={profile} isOwner={isOwner} />}
    </Popover>
  </Overlay>
);

export default compose(
  withAuth,
  graphql(ProfileByIdQuery, {
    options: ({ userId }) => ({ variables: { id: userId } }),
    props: ({ data, ownProps }) => ({
      loading: data.loading,
      profile: data.profileById,
      isOwner: data.profileById && data.profileById._id === ownProps.auth._id,
    }),
  })
)(UserPopover);
