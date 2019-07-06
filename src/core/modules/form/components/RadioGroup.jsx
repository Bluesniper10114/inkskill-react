import React from 'react';
import classNames from 'classnames';

const RadioItem = ({ id, checked, label, name, onChange }) => {
  const htmlId = `${name}_${id}`;

  return (
    <div className="RadioItem">
      <input
        id={htmlId}
        type="radio"
        name={name}
        value={id}
        onChange={onChange}
        checked={checked}
      />
      <label htmlFor={htmlId}>{label}</label>
    </div>
  );
};

const RadioGroup = ({
  name,
  title,
  value,
  error,
  options,
  inline,
  onChange,
}) => (
  <div className={classNames('RadioGroup form-group', { inline })}>
    {title && <label>{title}</label>}
    {options.map(opt => (
      <RadioItem
        key={opt.id}
        id={opt.id}
        name={name}
        label={opt.label}
        checked={value === opt.id}
        onChange={onChange}
      />
    ))}
    {error && <span className="error">{error}</span>}
  </div>
);

export default RadioGroup;
