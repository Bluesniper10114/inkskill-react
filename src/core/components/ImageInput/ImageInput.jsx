import React from 'react';

const ImageInput = ({
  value,
  className = 'hidden',
  multiple = false,
  onInputClick,
  onSelectFile,
}) => (
  <input
    className={className}
    type="file"
    value={value}
    accept="image/*"
    multiple={multiple}
    onClick={onInputClick}
    onChange={onSelectFile}
  />
);

export default ImageInput;
