import React from 'react';
import PostCard from 'core/components/PostCard';
import AddPostCard from './AddPostCardContainer';

const List = ({
  profile,
  updateUrl,
  isOwner,
}) => (
  <div className="row img-post-box">
    {isOwner && (
      <div className="col-md-4 col-sm-6">
        <AddPostCard />
      </div>
    )}
    {profile.images.map(image => (
      <div key={image._id} className="col-md-4 col-sm-6">
        <PostCard data={image} updateUrl={updateUrl} />
      </div>
    ))}
  </div>
);

List.defaultProps = {
  updateUrl: true,
};

export default List;
