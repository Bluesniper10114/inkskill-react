import React from 'react';
import { Link } from 'core/components';
import { timeAgo } from 'core/utils/dates';
import LikeIcon from 'assets/svg/like-icon.svg';
import Avatar from '../ActivityAvatar';

const Status = ({ data, children }) => (
  <div className="status-box">
    <div className="header">
      <div className="row no-pads">
        <div className="col-xs-12">
          <Avatar user={data.user} />
          <div className="text-box">
            <span className="username">{data.user.name}</span>
            <span className="type">Enthusiast</span>
          </div>
        </div>
      </div>
    </div>
    <div className="text-box">
      {children || <p>{data.text}</p>}
    </div>
    <div className="footer">
      <ul className="list-inline">
        <li><Link>like</Link></li>
        <li><Link>reply</Link> </li>
        <li>
          <LikeIcon /> {' '}
          <span className="number">7</span>
        </li>
        <li className="time">{timeAgo(data.createdAt)}</li>
      </ul>
    </div>
  </div>
);

export default Status;
