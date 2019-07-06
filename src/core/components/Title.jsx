import React from 'react';

const Title = ({ children }) => (
  <div className="title-section">
    <div className="container">
      <div className="row">
        <div className="col-xs-12">
          <h4>{children}</h4>
        </div>
      </div>
    </div>
  </div>
);

export default Title;
