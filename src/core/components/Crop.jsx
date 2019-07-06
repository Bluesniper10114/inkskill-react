import React from 'react';
import pure from 'recompose/pure';
import crop from 'core/utils/crop';

const Crop = ({ children, className, title, tag: Tag = 'span', maxLength = 100 }) => {
  const { content, text } = crop(children, maxLength);
  return (
    <Tag className={className} title={title ? text : null}>{content}</Tag>
  );
};

export default pure(Crop);
