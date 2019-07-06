import React from 'react';
import Avatar from 'core/components/Avatar';

const UsersSlide = ({ content }) => (
  <ul className="list-inline text-center">
    {content.map((user, index) => (
      <li key={index}><Avatar /></li>
    ))}
  </ul>
);

export default UsersSlide;
