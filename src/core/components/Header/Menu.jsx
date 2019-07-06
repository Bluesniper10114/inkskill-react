import React from 'react';
import { getCurrentProfileUrl } from 'core/utils/profile';
import { Avatar, Link } from 'core/components';
import Dropdown from 'core/components/Dropdown';
import SearchIcon from 'assets/svg/search-icon-header.svg';
import WorldIcon from 'assets/svg/world-icon.svg';
import CaretIcon from 'assets/svg/caret-icon.svg';


export const MobileMenu = ({ user, logout }) => (
  <ul className="user-menu hidden-desktop">
    <li className="icon-box">
      <Avatar user={user} size="sm" />
    </li>
    <li>
      <Link to={getCurrentProfileUrl(user)}>
        Profile
      </Link>
    </li> {' '}
    <li><a onClick={logout}>Logout</a></li>
  </ul>
);

const button = ({ onClick }) => (
  <CaretIcon
    className="dropdown-toggle caret-icon"
    onClick={onClick}
  />
);

export const Menu = ({ user, logout, onSearch }) => (
  <ul className="user-menu visible-desktop">
    <li className="icon-box"><WorldIcon className="world-icon" /></li>
    <li className="icon-box">
      <Avatar user={user} size="sm" />
    </li>
    <li className="icon-box"><SearchIcon onClick={onSearch} /></li>
    <li className="icon-box">
      <Dropdown button={button} menuClass="pull-right">
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
        <li><Link>Become a blogger</Link></li>
        <li onClick={logout}>Logout</li>
      </Dropdown>
    </li>
  </ul>
);
