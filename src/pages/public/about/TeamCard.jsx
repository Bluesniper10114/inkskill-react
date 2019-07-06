// @flow

import React from 'react';
import Avatar from 'core/components/Avatar';

type Props = { member: TeamMember };

const TeamCard = ({
  member,
}: Props): React$Element<any> => (
  <div className="team-card">
    <Avatar
      image={`${member.image}`}
      type="team"
      square
    />
    <div className="text-box">
      <h5 className="name">{member.name}</h5>
      <h6 className="title">{member.designation}</h6>
    </div>
  </div>
);

export default TeamCard;
