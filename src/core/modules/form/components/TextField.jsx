import React from 'react';

const TextField = ({
  name,
  value,
  error,
  placeholder,
  type = 'text',
  onChange,
  onBlur,
}) => (
  <div className="form-group">
    <input
      type={type}
      name={name}
      className="form-control"
      placeholder={placeholder}
      value={value || ''}
      onChange={onChange}
      onBlur={onBlur}
    />
    {error && <span className="error">{error}</span>}
  </div>
);

export default TextField;
