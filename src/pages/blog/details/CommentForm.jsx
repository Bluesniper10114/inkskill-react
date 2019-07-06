import React from 'react';
import { Avatar, Link } from 'core/components';

const CommentForm = () => (
  <div className="comment-form">
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-3 text-center text-right-md">
              <Avatar link={false} />
              <div className="name-box">
                <h6 className="name"><Link>Brandon Ryan</Link></h6>
                <h5 className="type">Enthusiast</h5>
              </div>
            </div>
            <div className="col-md-9">
              <form>
                <textarea className="form-control" rows="6" />
                <div className="text-right">
                  <button className="btn btn-navi">Add Comment</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CommentForm;
