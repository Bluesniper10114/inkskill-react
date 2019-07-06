import React from 'react';
import Controls from './Controls';
import Sharing from './Sharing';
import FullScreen from './FullScreen';
import { getContent } from '../utils';

const Content = ({
  post,
  sharing,
  fullScreen,
  download,
  toggleSharing,
  toggleFullScreen,
}) => (
  <div className="img-box">
    <Controls
      actions={{
        share: toggleSharing,
        fullScreen: toggleFullScreen,
        download,
      }}
    />
    {!fullScreen && getContent(post)}
    {sharing && <Sharing id={post._id} toggle={toggleSharing} />}
    {fullScreen && (
      <FullScreen
        post={post}
        onExit={toggleFullScreen}
      />
    )}
  </div>
);

export default Content;
