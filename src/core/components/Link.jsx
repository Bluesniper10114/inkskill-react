// @flow

import React from 'react';
import branch from 'recompose/branch';
import { Link } from 'react-router';
import { getProfileUrl } from 'core/utils/profile';

const ExternalLink = ({
  href,
  children,
  ...props
}) => <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;

const getUrl = (to: string | UserBase): string => {
  if (typeof to === 'string') return to;

  return getProfileUrl(to);
};

const AppLink = ({ to = 'not-found', ...props }) => (
  <Link to={getUrl(to)} {...props} />
);

export default branch(
  ({ href }) => !!href,
  () => ExternalLink,
)(AppLink);
