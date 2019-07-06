import React from 'react';
import classNames from 'classnames';
import Item from './MenuItem';

const Menu = ({ items, className, onSelect }) => (
  <ul className={classNames('dropdown-menu', className)}>
    {items.map((item, index) => (
      <Item key={index} data={item} onSelect={onSelect} />
    ))}
  </ul>
);

export default Menu;
