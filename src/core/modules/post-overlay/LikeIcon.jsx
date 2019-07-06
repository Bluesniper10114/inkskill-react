import React from 'react';
import LikeIcon from 'core/components/LikeIcon';
import LikedList from './LikedList';

const Component = ({ postId, type }) => (
  <LikedList postId={postId} type={type}>
    <LikeIcon className="like-icon" type={type} />
  </LikedList>
);

export default Component;
