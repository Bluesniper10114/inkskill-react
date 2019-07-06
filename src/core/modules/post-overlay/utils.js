import React from 'react';

const YoutubeVideo = ({ id }) => (
  <iframe
    id="ytplayer"
    type="text/html"
    width="720"
    height="400"
    src={`http://www.youtube.com/embed/${id}`}
    frameBorder="0"
  />
);

export const getContent = (post) => {
  if (!post._id) return null;

  if (post.source && post.source.type === 'youtube') {
    return <YoutubeVideo id={post.source.id} />;
  } else if (post.type === 'video') {
    return <video src={post.url} controls poster={post.previewUrl} />;
  }

  return <img src={post.url} alt="Post" />;
};
