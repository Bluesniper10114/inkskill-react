import React from 'react';
import Avatar from 'core/components/Avatar';

const ProfileCard = () => (
  <div className="profile-card">
    <Avatar link={false} />
    <div className="text-box">
      <h4 className="name">Herman Fernandez</h4>
      <h6 className="location">San francisco, CA</h6>
    </div>
  </div>
);

export default ProfileCard;
