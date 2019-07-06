import React from 'react';
import { Link, ProfileLink } from 'core/components';
import PostActions from 'core/components/PostActions';
import { getImageUrl } from 'core/utils/images';
import { timeAgo } from 'core/utils/dates';

import TimeIcon from 'assets/svg/time-icon.svg';
import LikeIcon from 'assets/svg/like-icon.svg';
import SpeachIcon from 'assets/svg/speach-icon.svg';

import Avatar from '../ActivityAvatar';


const TimeLineItem = ({ data }) => (
  <div>
    <div className="time-box">
      <span>{timeAgo(data.createdAt)}</span> {' '}
      <TimeIcon />
    </div>
    <div className="posting-card">
      <div className="header clearfix">
        <div className="left-group">
          <div className="inline-group text-center text-left-sm">
            <Avatar user={data.user} /> {' '}
            <ProfileLink className="name" user={data.user} />
          </div>
        </div>
        <div className="right-group text-center text-right-md clearfix">
          <div className="group-inline post-stats">
            <LikeIcon className="like-icon red" />
            <span>{(data.stats && data.stats.likes) || 0}</span>
          </div>
          <div className="group-inline post-stats">
            <SpeachIcon />
            <span>{(data.stats && data.stats.comments) || 0}</span>
          </div>
        </div>
      </div>
      <div className="body">
        <div className="img-box">
          <Link href="#">
            <img src={getImageUrl(data)} alt="Post" />
          </Link>
        </div>
      </div>
      <div className="footer clearfix">
        <div className="left-group text-center text-left-sm">
          <h3 className="title"><Link>Feedback Management</Link></h3>
          <h3 className="subtitle"><Link>{data.style_title}</Link></h3>
        </div>

        <div className="right-group text-center text-right-sm">
          <PostActions post={data} />
        </div>
      </div>
    </div>
  </div>
);

export default TimeLineItem;
