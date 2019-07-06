import React from 'react';
import { Spacer } from 'core/components';
import Comment from './Comment';

const Comments = () => (
  <div className="comment-box">
    <h5 className="title text-center">Comments<span className="counts">(3)</span></h5>
    <Spacer />
    <Spacer type="tall" />

    <ul>
      <li>
        <Comment />
        <ul>
          <li><Comment /></li>
        </ul>
      </li>
      <li><Comment /></li>
    </ul>
  </div>
);

export default Comments;
