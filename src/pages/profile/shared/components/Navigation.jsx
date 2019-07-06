import React from 'react';
import { IndexLink } from 'react-router';
import { Link } from 'core/components';

const Navigation = ({ baseUri }) => (
  <ul className="list-inline text-center profile-nav">
    <li><IndexLink activeClassName="active" to={baseUri}>WALL</IndexLink></li>
    <li><Link activeClassName="active" to={`${baseUri}/photos`}>PHOTOS</Link></li>
    <li><Link activeClassName="active" to={`${baseUri}/video`}>VIDEO</Link></li>
    <li><Link activeClassName="active" to={`${baseUri}/reviews`}>REVIEWS</Link></li>
    <li><Link activeClassName="active" to={`${baseUri}/questions`}>QUESTIONS</Link></li>
  </ul>
);

export default Navigation;
