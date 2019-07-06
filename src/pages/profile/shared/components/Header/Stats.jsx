import React from 'react';

const Stats = ({ stats, showFollowers, showFollowing }) => (
  <ul className="profile-stats list-inline">
    <li>
      <span className="number">{stats.posts}</span>
      <span className="name">posts</span>
    </li>
    <li>
      <button className="btn-follow-list" onClick={showFollowers}>
        <span className="number">{stats.followers}</span>
        <span className="name">followers</span>
      </button>
    </li>
    <li>
      <button className="btn-follow-list" onClick={showFollowing}>
        <span className="number">{stats.following}</span>
        <span className="name">following</span>
      </button>
    </li>
  </ul>
);

export default Stats;
