import React from 'react';

const Header = ({ term }) => (
  <div className="container">
    <div className="row">
      <div className="col-md-10 col-md-offset-1">
        <div className="search-result-text-box">
          results found for: <span>{term}</span>
        </div>
      </div>
    </div>
  </div>
);

export default Header;
