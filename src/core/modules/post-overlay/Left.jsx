import React from 'react';
import { Avatar, Link, ProfileLink } from 'core/components';
import { getStyles } from 'core/utils/posts';
import PostActions from 'core/components/PostActions';
import PostContent from './Content';
import Stats from './Stats';

const Left = ({ post, onLikesClick, onCommentsClick }) => (
  <div className="left-side">
    <div className="head">
      <div className="row no-pads">
        <div className="col-sm-6">
          <Avatar user={post.user} />
          <h4 className="name">
            <ProfileLink user={post.user} />
          </h4>
        </div>
        <div className="col-sm-6 text-right">
          <Stats
            postId={post.post}
            data={post.stats}
            onLikesClick={onLikesClick}
            onCommentsClick={onCommentsClick}
          />
        </div>
      </div>
    </div>
    <div className="body body-left">
      <PostContent post={post} />
    </div>
    <div className="foot">
      <div className="row no-pads">
        <div className="col-sm-8 col-xs-3">
          <h5 className="title"><Link>{post.name || 'No Name'}</Link></h5>
          <h6 className="cat"><Link>{getStyles(post.style)}</Link></h6>
        </div>
        <div className="col-sm-4 col-xs-9 text-center text-right-md">
          <PostActions post={post} />
        </div>
      </div>
    </div>
  </div>
);

export default Left;
