import React from 'react';
import { Link } from 'core/components';
import UserIcon from 'assets/svg/user-icon.svg';

const GuestMenu = () => (
  <ul className="user-menu">
    <li className="icon-box"><UserIcon /></li>
    <li><Link to="/login">Login</Link></li> {' '}
    <li><Link to="/sign-up">Sign Up</Link></li>
  </ul>
);

export default GuestMenu;
