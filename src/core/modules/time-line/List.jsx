import React from 'react';
import ListItem from './ListItem';

const List = ({ items }) => (
  <ul className="timeline-list">
    {items.map(item => (
      <ListItem key={item._id} data={item} />
    ))}
  </ul>
);

export default List;
