import React from 'react';
import Avatar from './Avatar';
import ProfileLink from './ProfileLink';
import { ROLES } from 'core/constants';

const UserListItem = ({ data }) => (
  <li className="col-md-6">
    <Avatar user={data} />
    <div className="text-box">
      <h3 className="name">
        <ProfileLink user={data} />
      </h3>
      <h4 className="member-type">{ROLES[data.role]}</h4>
    </div>
  </li>
);

const UserList = ({ users }) => (
  <div className="list-container-inner">
    <ul className="row">
      {users.map(user => (
        <UserListItem key={user._id} data={user} />
      ))}
    </ul>
  </div>
);

export default UserList;
