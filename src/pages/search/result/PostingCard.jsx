import React from 'react';
import { Avatar, Link } from 'core/components';
import postingImg from 'assets/img/posting-img.jpg';

const PostingCard = () => (
  <div className="posting-card">
    <div className="header clearfix">
      <div className="left-group">
        <div className="inline-group text-center text-left-sm">
          <Avatar />
          <Link className="name">Herman Fernandez</Link>
        </div>
      </div>

    </div>
    <div className="body">
      <div className="img-box">
        <Link>
          <img src={postingImg} title="Post Name" />
        </Link>
      </div>
    </div>
    <div className="footer clearfix">
      <div className="left-group text-center text-left-sm">
        <h3 className="title"><Link href="#">Feedback Management</Link></h3>
        <h3 className="subtitle"><Link href="#">Abstract</Link></h3>
      </div>
    </div>
  </div>
);

export default PostingCard;
