import React from 'react';
import FacebookIcon from 'assets/svg/fb-icon.svg';

const FacebookButton = ({ children, onClick }) => (
  <button type="button" className="btn btn-facebook btn-lg btn-block" onClick={onClick}>
    <FacebookIcon /> {' '}
    {children}
  </button>
);

export default FacebookButton;
