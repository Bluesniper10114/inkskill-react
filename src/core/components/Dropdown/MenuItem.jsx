import React from 'react';
import { branch, renderComponent } from 'recompose';

const MenuItem = ({ data, onSelect }) => (
  <li onClick={() => onSelect(data.id)}>
    {data.label}
  </li>
);

const Divider = () => (
  <li role="separator" className="divider" />
);

export default branch(
  ({ data }) => data === '---',
  renderComponent(Divider),
)(MenuItem);
