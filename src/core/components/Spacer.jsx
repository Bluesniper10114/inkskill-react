import React from 'react';
import classNames from 'classnames';

const Spacer = ({ type }) => {
  const className = classNames('spacer', type);
  return (
    <div className={className} />
  );
};

export default Spacer;
