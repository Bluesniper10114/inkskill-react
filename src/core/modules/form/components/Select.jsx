import React from 'react';

const Select = ({
  name,
  value,
  error,
  options,
  placeholder,
  onChange,
}) => (
  <div className="form-group">
    <select
      className="form-control"
      name={name}
      value={value || ''}
      onChange={onChange}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(opt => (
        <option key={opt.id || opt._id} value={opt.id || opt._id}>
          {opt.label || opt.name}
        </option>
      ))}
    </select>
    <div className="icon-box">
      <span className="triangle" />
    </div>
    {error && <span className="error">{error}</span>}
  </div>
);

export default Select;
