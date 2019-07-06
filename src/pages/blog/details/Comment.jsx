import React from 'react';
import { Link, Avatar } from 'core/components';
import TimeIcon from 'assets/svg/time-icon.svg';
import RightChevron from 'assets/svg/right-chevron.svg';

const Comment = () => (
  <div className="comment inline-group">
    <Avatar />
    <div className="text-box">
      <div className="row">
        <div className="col-sm-6">
          <div className="name-box text-center text-left-sm">
            <h6 className="name"><Link>Brandon Ryan</Link></h6>
            <h5 className="type">Enthusiast</h5>
          </div>
        </div>
        <div className="col-sm-6 text-right-sm">
          <div className="time-box">
            <TimeIcon /> {' '}
            <span>12 min ago</span>
          </div>
        </div>
      </div>
      <p className="comment-text">
        In the last five to six years the FTA satellite receiver has become an everyday household
        electronic device. People all over the world are buying free to air receivers because of
        their growing and always evolving features and capabilities. FTA receivers these days are
        gaining popularity all over.
      </p>
      <button className="btn btn-transp">
        <RightChevron /> Reply
      </button>
    </div>
  </div>
);

export default Comment;
