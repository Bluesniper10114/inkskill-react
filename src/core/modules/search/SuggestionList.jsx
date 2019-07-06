import React from 'react';
import classNames from 'classnames';

const SuggestionList = ({ items = [], visible, onSelect }) => (
  <div className={classNames('dropdown', { open: visible && items.length })}>
    <ul className="dropdown-menu">
      {items.map(item => (
        <li key={item.id} onClick={() => onSelect(item)}>{item.label}</li>
      ))}
    </ul>
  </div>
);

export default SuggestionList;
