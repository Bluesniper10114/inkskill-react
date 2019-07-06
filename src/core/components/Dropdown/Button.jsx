import React from 'react';
import classNames from 'classnames';

const DropdownButton = ({ className, children, onClick }) => (
  <button
    type="button"
    className={classNames('btn dropdown-toggle', className)}
    onClick={onClick}
  >
    {children}
    {typeof children === 'string' ? <span className="caret" /> : null}
  </button>
);

export default DropdownButton;
