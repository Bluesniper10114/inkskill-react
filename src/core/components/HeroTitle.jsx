import React from 'react';

const HeroTitle = ({ className, children }) => (
  <div className={`hero-title ${className}`}>
    <div className="bg-overlay" />
    <div className="text-box text-center">
      <h2 className="page-title">{children}</h2>
    </div>
  </div>
);

export default HeroTitle;
