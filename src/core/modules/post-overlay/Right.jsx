import React from 'react';
import Share from './Share';
import Comment from './Comments/Comment';
import AddComment from './Comments/AddCommentContainer';
import FacebookShare from './FacebookLike';

const Right = ({ post, pictureUrl }) => {
  const pageUrl = process.env.NODE_ENV === 'development' ? `http://stage.inkskill.com${location.pathname}` : location.href;

  return (
    <div className="right-side">
      <div className="head">
        <div className="row no-pads">
          <div className="col-sm-9">
            <Share page={location.href} media={pictureUrl} />
          </div>
          <div className="col-sm-3 text-center text-right-sm">
            <FacebookShare pageUrl={pageUrl} />
          </div>
        </div>
      </div>
      <div className="body body-right">
        <ul>
          {!post.comments.length ? <li>No comments</li> : post.comments.map((comment, key) => (
            <Comment key={key} data={comment} />
          ))}
        </ul>
      </div>
      <div className="foot">
        <AddComment post={post} />
      </div>
    </div>
  );
};

export default Right;
