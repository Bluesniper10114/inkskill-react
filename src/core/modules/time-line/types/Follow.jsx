import React from 'react';
import { ProfileLink } from 'core/components';
import Avatar from '../ActivityAvatar';

const Follow = ({ data }) => (
  <div className="person-activity-box text-center text-left-sm">
    <div className="inline-group">
      <Avatar user={data.user} />
      <ProfileLink className="name" user={data.user} />
      <div className="activity">
        following
      </div>
      <ul className="list-inline">
        {data.data.map(user => (
          <Avatar key={user._id} user={user} tag="li" />
        ))}
      </ul>
    </div>
  </div>
);

export default Follow;
