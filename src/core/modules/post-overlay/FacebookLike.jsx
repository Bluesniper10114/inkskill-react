import React from 'react';
import { FB_APP_ID } from 'core/config/env';

const getUrl = (pageUrl) => {
  const baseUrl = 'https://www.facebook.com/plugins/like.php';
  const href = encodeURIComponent(pageUrl);

  return `${baseUrl}?href=${href}&width=51&layout=button&action=like&size=small&show_faces=false&share=false&height=65&appId=${FB_APP_ID}`;
};

const FacebookShare = ({ pageUrl }) => (
  <iframe
    src={getUrl(pageUrl)}
    width="51"
    height="65"
    style={{ border: 'none', overflow: 'hidden' }}
    scrolling="no"
    frameBorder="0"
    allowTransparency="true"
  />
);

export default FacebookShare;
