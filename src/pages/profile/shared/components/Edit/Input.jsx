import React from 'react';

const Input = ({
  value,
  name,
  placeholder,
  readOnly,
  onChange,
  onClick,
  onBlur,
}) => (
  <input
    type="text"
    className="form-control"
    placeholder={placeholder}
    name={name}
    value={value || ''}
    readOnly={readOnly}
    onChange={onChange}
    onClick={onClick}
    onBlur={onBlur}
  />
);

export default Input;
