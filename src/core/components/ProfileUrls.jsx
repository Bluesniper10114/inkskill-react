import React from 'react';
import { Link, SocialIcon } from 'core/components';
import branch from 'recompose/branch';
import renderComponent from 'recompose/renderComponent';

const URLS_ORDER = ['web', 'fb', 'tw', 'gp', 'ig'];

export const ActiveUrl = ({ urls, type }) => (
  <Link href={urls[type]}>
    <SocialIcon className="navi" type={type} />
  </Link>
);

export const InactiveUrl = ({ type, onClick }) => (
  <span>
    <SocialIcon
      className="navi not-connected inactive"
      type={type}
      onClick={onClick}
    />
  </span>
);

export const isInactive = ({ urls, type }) => !urls[type];

const UrlItem = branch(
  isInactive,
  renderComponent(InactiveUrl)
)(ActiveUrl);

const ProfileUrls = ({ urls, component: Url = UrlItem }) => (
  <ul className="list-inline">
    {URLS_ORDER.map(type => (
      <li key={type}>
        <Url urls={urls} type={type} />
      </li>
    ))}
  </ul>
);

export default ProfileUrls;
