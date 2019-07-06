import React from 'react';
import { Link } from 'core/components';
import { SHARING } from 'core/config/urls';

import FbIcon from 'assets/svg/fb-icon.svg';
import TwIcon from 'assets/svg/tw-icon.svg';
import GpIcon from 'assets/svg/gp-icon.svg';
import PtIcon from 'assets/svg/pt-icon.svg';

const mockSharePage = {
  page: 'http://www.inkskill.com/photo/njeEN3Ff4d/715',
  media: 'http://www.inkskill.com/public/media/images/njeEN3Ff4d/file_67_6_1484948625.jpg',
};

const getShareUrl = (template, params) => {
  const values = process.env.NODE_ENV === 'development' ? mockSharePage : params;
  const keys = Object.keys(params);
  let url = template;

  keys.forEach((key) => {
    const reg = new RegExp(`{${key}}`, 'gmi');
    url = url.replace(reg, values[key]);
  });

  return url;
};

const Share = props => (
  <ul className="list-inline">
    <li className="name-label">Share your love</li>
    <li><Link href={getShareUrl(SHARING.fb, props)}><FbIcon /></Link></li>
    <li><Link href={getShareUrl(SHARING.tw, props)}><TwIcon /></Link></li>
    <li><Link href={getShareUrl(SHARING.gp, props)}><GpIcon /></Link></li>
    <li><Link href={getShareUrl(SHARING.pt, props)}><PtIcon /></Link></li>
  </ul>
);

export default Share;
