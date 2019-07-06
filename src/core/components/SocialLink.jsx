// @flow

import React from 'react';
import branch from 'recompose/branch';
import renderNothing from 'recompose/renderNothing';
import Link from './Link';
import SocialIcon from './SocialIcon';

const SocialLink = ({ type = 'default', ...props }) => (
  <li><Link {...props}><SocialIcon type={type} /></Link></li>
);

export default branch(
  ({ href, to }) => (!href && !to),
  renderNothing,
)(SocialLink);
