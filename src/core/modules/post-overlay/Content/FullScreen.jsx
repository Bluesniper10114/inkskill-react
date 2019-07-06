import React from 'react';
import { ProfileLink } from 'core/components';
import fullScreen from 'core/utils/fullscreen';
import { Spinner } from 'core/utils/loading';
import IconClose from 'assets/svg/x-mark.svg';
import { getSourceUrl } from 'core/utils/posts';
import { getContent } from '../utils';

const FullScreen = ({ post, onExit }) => (
  <div className="image-fullscreen">
    <div className="close" onClick={onExit}><IconClose /></div>
    {post._id
      ? getContent(post)
      : <Spinner />
    }
    {post.user && (
      <div className="info">
        <div>
          <ProfileLink user={post.user} onClick={onExit} />
          {<span> | {post.name || 'No Name'}</span>}
        </div>
        <a
          href={getSourceUrl(post.url)}
          rel="noopener noreferrer"
          target="_blank"
        >
          Download
        </a>
      </div>
    )}
  </div>
);

export default fullScreen(FullScreen);
