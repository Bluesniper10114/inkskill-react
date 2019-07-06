import React from 'react';

const Center = ({ href, image }) => (
  <div className="ad-box text-center">
    <a href={href}><img src={image} alt="Ads" /></a>
  </div>
);

export default Center;
