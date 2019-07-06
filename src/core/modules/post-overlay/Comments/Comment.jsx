import React from 'react';
import { Avatar } from 'core/components/index';
import { timeAgoShort } from 'core/utils/dates';
import { ROLES } from 'core/constants';
import TimeIcon from 'assets/svg/time-icon.svg';
import LikeIcon from 'assets/svg/like-icon.svg';
import ReplyForm from './ReplyFormContainer';

const Comment = ({ data, reply, onLike, onReply }) => (
  <li className="comment">
    <div className="header">
      <div className="row no-pads">
        <div className="col-xs-10">
          <Avatar user={data.user} />
          <div className="text-box">
            <span className="username">{data.user.name}</span>
            <span className="type">{ROLES[data.user.role]}</span>
          </div>
        </div>
        <div className="col-xs-2 text-right">
          <TimeIcon /> {' '}
          <span className="time">{timeAgoShort(data.createdAt)}</span>
        </div>
      </div>
    </div>
    <div className="text-box">
      <p>{data.comment}</p>
    </div>
    <div className="footer">
      <ul className="list-inline">
        {!data.isMine && (
          <li className="button-link" onClick={onLike}>
            {data.isLiked ? 'unlike' : 'like'}
          </li>
        )}
        <li className="button-link" onClick={onReply}>reply</li>
        {data.stats.replies > 0 && (
          <li className="button-link">{data.stats.replies} replies</li>
        )}
        <li>
          <LikeIcon /> {' '}
          <span className="number">{data.stats.likes}</span>
        </li>
      </ul>
      {reply && <ReplyForm commentId={data.id} onClose={onReply} />}
    </div>
  </li>
);

export default Comment;
