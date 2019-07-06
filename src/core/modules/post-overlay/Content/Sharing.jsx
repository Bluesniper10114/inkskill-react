import React from 'react';
import IconClose from 'assets/svg/x-mark.svg';
import { SITE_URL } from 'core/config/env';

const Sharing = ({ id, toggle }) => {
  const frameUrl = `${SITE_URL}/embed-page.php?href=${SITE_URL}/photo/${id}`;
  return (
    <div className="image-sharing">
      <span className="close" onClick={toggle}><IconClose /></span>
      <samp>
        {`<iframe src="${frameUrl}" width="500" scrolling="no" frameborder="0" allowTransparency="true"></iframe>`}
      </samp>
      <iframe
        src={frameUrl}
        width="100%"
        height="500"
        frameBorder="0"
      />
    </div>
  );
};

export default Sharing;
