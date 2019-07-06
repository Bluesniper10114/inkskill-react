import React from 'react';
import Form from './Form';
import List from './List';

const TimeLine = ({ items, readOnly }) => (
  <div className="timeline-cage">
    {readOnly || <Form />}
    {items.length > 0 && (
      <div className="timeline">
        <List items={items} />
      </div>
    )}
  </div>
);

export default TimeLine;
