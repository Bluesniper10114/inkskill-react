import React from 'react';
import { Opener } from 'core/modules/post-overlay';
import { getStyles } from 'core/utils/posts';
import withEnvironment from 'core/utils/environment';
import ProfileLink from './ProfileLink';

import LikeIcon from 'assets/svg/like-icon.svg';
import PlayIcon from 'assets/svg/play-btn.svg';
import SpeachIcon from 'assets/svg/speach-icon.svg';


const PostCard = ({ data, type, updateUrl = true, environment }) => {
  const settings = {
    id: data.post,
    prevId: data.prev,
    nextId: data.next,
    useLink: environment === 'mobile',
    updateUrl,
  };

  return (
    <div className="post-card">
      <div className="img-box" {...settings}>
        <img src={data.previewUrl} />
        {type === 'video' && (
          <button className="btn btn-transp btn-play">
            <PlayIcon />
          </button>
        )}
      </div>
      <div className="text-box">
        <div className="post-stats">
          <div className="group-inline">
            <LikeIcon className="like-icon" />
            <span>{data.stats.likes}</span>
          </div>
          <div className="group-inline">
            <SpeachIcon />
            <span>{data.stats.comments}</span>
          </div>
        </div>
        <div className="text-center title-box">
          <h3 className="title">
            {data.user ? <ProfileLink user={data.user} /> : getStyles(data.style)}
          </h3>
          <h3 className="subtitle">
            <div {...settings}>{data.name || '—'}</div>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default withEnvironment(PostCard);
