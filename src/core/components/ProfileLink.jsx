import React from 'react';
import { getProfileUrl } from 'core/utils/profile';
import Link from './Link';

const ProfileLink = ({ user, ...props }) => (
  <Link to={getProfileUrl(user)} {...props}>{user.name}</Link>
);

export default ProfileLink;
