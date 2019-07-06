import React from 'react';
import IconCode from 'assets/svg/fa/code.svg';
import IconDownload from 'assets/svg/fa/download.svg';
import IconArrows from 'assets/svg/fa/arrows-alt.svg';

const Controls = ({ actions }) => (
  <ul className="list-inline image-controls">
    <li onClick={actions.share}><IconCode /></li>
    <li onClick={actions.download}><IconDownload /></li>
    <li onClick={actions.fullScreen}><IconArrows /></li>
  </ul>
);

export default Controls;
