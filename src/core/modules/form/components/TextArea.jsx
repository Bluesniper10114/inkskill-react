import React from 'react';

const TextArea = ({
  name,
  value,
  error,
  placeholder,
  rows = 4,
  type = 'text',
  onChange,
  onBlur,
}) => (
  <div className="form-group">
    <textarea
      rows={rows}
      type={type}
      className="form-control"
      placeholder={placeholder}
      name={name}
      value={value || ''}
      onChange={onChange}
      onBlur={onBlur}
    />
    {error && <span className="error">{error}</span>}
  </div>
);

export default TextArea;
