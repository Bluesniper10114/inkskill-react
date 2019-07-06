import React from 'react';
import { timeAgoShort } from 'core/utils/dates';
import IconTime from 'assets/svg/time-icon.svg';
import Post from './types';

const ListItem = ({ data }) => (
  <li>
    <div className="time-box">
      <span>{timeAgoShort(data.createdAt)}</span>{' '}<IconTime />
    </div>
    <Post data={data} />
  </li>
);

export default ListItem;
