import React from 'react';
import LikeMenu from './LikeMenu';
import PostMenu from './PostMenuContainer';
import ShareMenu from './ShareMenu';

const PostActions = ({ post }) => (
  <div>
    <ShareMenu />
    <LikeMenu post={post} />
    <PostMenu post={post} />
  </div>
);

export default PostActions;
