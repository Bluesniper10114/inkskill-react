import React from 'react';
import { Link } from 'core/components';
import Status from './Status';

const BlogPost = ({ data }) => (
  <Status data={data}>
    <h4 className="title">
      <Link to={`/blog/${data.post_name}`}>{data.post_title}</Link>
    </h4>
    <div>
      {data.post_content} {' '}
      <Link to={`/blog/${data.post_name}`}>read more</Link>
    </div>
  </Status>
);

export default BlogPost;
