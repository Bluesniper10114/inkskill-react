import React from 'react';
import renderNothing from 'recompose/renderNothing';
import switcher from 'core/utils/switcher';
import Status from './Status';
import Post from './Post';
import Follow from './Follow';
import BlogPost from './BlogPost';

const SomethingElse = ({ data }) => {
  const Nothing = renderNothing();
  console.log(`SomethingElse <${data.type}>`, data);
  return <Nothing />;
};

const types = {
  // 11 // Tagged in image
  status: Status,
  // 8 // Created a new shop
  blog: Status,
  7: BlogPost,
  // 6 // Changed an answer,
  // 4 // Changed profile picture
  2: Post, // video
  1: Post, // image
  image: Status,
  photo: Post,
  shop: Status,
  profile: Status,
  follow: Follow,
  default: SomethingElse, // SomethingElse,
};

export default switcher(({ data }) => data.type, types);
