import React from 'react';
import PostCard from 'core/components/PostCard';
import AddVideo from './AddVideoCardContainer';

const List = ({ profile, isOwner, updateUrl }) => (
  <div className="row video-post-box">
    {isOwner && (
      <div className="col-md-4 col-sm-6">
        <AddVideo />
      </div>
    )}
    {profile.videos.map(video => (
      <div key={video._id} className="col-md-4 col-sm-6">
        <PostCard type="video" data={video} updateUrl={updateUrl} />
      </div>
    ))}
  </div>
);

List.defaultProps = {
  updateUrl: true,
};

export default List;
