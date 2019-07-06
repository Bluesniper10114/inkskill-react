import React from 'react';
import classNames from 'classnames';
import { Avatar, ProfileLink } from 'core/components';
import { get } from 'lodash';
import { timeAgo } from 'core/utils/dates';
import Rating from './Rating';
import TagList from './TagList';
import TimeIcon from 'assets/svg/time-icon.svg';
import ThumbUpIcon from 'react-icons/lib/fa/thumbs-up';
import ThumbDnIcon from 'react-icons/lib/fa/thumbs-down';

const Review = ({ data, auth, voteUp, voteDown, approve, decline }) => {
  const isPending = get(data, 'status', '') === 'pending';
  const showApprove = isPending && get(auth, '_id') === get(data, 'artist._id');
  const showPending = isPending && get(auth, '_id') === get(data, 'user._id');

  return (
    <div className={classNames('comment inline-group text-center text-left-sm', { pending: isPending })}>
      <Avatar user={data.user} />
      <div className="text-box">
        <div className="clearfix no-pads">
          <div className="col-sm-6 inline-group">
            <h6 className="name">
              <ProfileLink user={data.user} />
            </h6> {' '}
            <div className="time-box">
              <TimeIcon /> {' '}
              <span>{timeAgo(data.createdAt)}</span>
            </div>
          </div>

          <div className="col-sm-6 text-center text-right-sm">
            <Rating value={data.stars} />
          </div>
        </div>
        <h4 className="comment-title">{data.title}</h4>
        <p className="comment-text">{data.description}</p>
        { data.tags && <TagList tags={data.tags} /> }

        { showApprove &&
          <div className="comment-action-box">
            Approve review:
            <button className="btn btn-navi" onClick={() => approve(data._id)}>
              Accept
            </button>
            <button className="btn btn-navi" onClick={() => decline(data._id)}>
              Decline
            </button>
          </div>
        }
        { showPending && <div>Review pending approval.</div> }
        { data.status === 'approved' &&
          <div className="comment-action-box">
            Was this review useful?
            <div className="vote-stats">
              <ThumbUpIcon className="vote-icon" onClick={() => voteUp(data._id)} />
              <span>{data.thumbUpCount}</span>
            </div>
            <div className="vote-stats">
              <ThumbDnIcon className="vote-icon" onClick={() => voteDown(data._id)} />
              <span>{data.thumbDownCount}</span>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default Review;
