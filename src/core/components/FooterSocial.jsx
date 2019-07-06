import React from 'react';
import { SOCIAL, RSS_FEED } from 'core/config/urls';
import { Link } from './index';
import SocialLink from './SocialLink';
import RssIcon from 'assets/svg/rss-icon.svg';

const FooterSocial = () => (
  <ul className="list-inline">
    <SocialLink type="fb" href={SOCIAL.fb} />
    <SocialLink type="tw" href={SOCIAL.tw} />
    <SocialLink type="ig" href={SOCIAL.ig} />
    <li><Link href={RSS_FEED}><RssIcon /></Link></li>
  </ul>
);

export default FooterSocial;
