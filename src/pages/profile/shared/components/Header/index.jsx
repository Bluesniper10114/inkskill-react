import React from 'react';
import { Avatar, Spacer } from 'core/components/index';
import QuotesBox from './QuotesBox';
import UploadPicHero from './UploadPicHero';
import UploadAvatar from './UploadAvatar';
import Buttons from './Buttons';
import Stats from './StatsContainer';

import defaultWallpaper from 'assets/img/profile-bg.jpg';

const Header = ({
  profile,
  isOwner,
}) => (
  <div className="profile-header">
    <div className="top-section" style={{ backgroundImage: `url(${profile.wallpaperUrl || defaultWallpaper})` }}>
      <div className="overlay-bg" />
      <QuotesBox quote={profile.quote} />
      {isOwner && <UploadPicHero />}
    </div>
    <div className="bottom-section">
      <div className="container">
        <div className="row">
          <div className="col-md-2 text-center hidden-lg hidden-md">
            {isOwner
              ? <UploadAvatar user={profile} />
              : <Avatar user={profile} size="md" />
            }
          </div>
          <div className="col-xs-12 text-center hidden-sm hidden-md hidden-lg">
            <Spacer />
            <Buttons profile={profile} isOwn={isOwner} />
            <Spacer />
          </div>
          <div className="col-sm-6 col-md-5 text-center text-left-md">
            <Stats stats={profile.stats} />
          </div>
          <div className="col-md-2 text-center hidden-sm hidden-xs">
            {isOwner
              ? <UploadAvatar className="profile-pic-box" user={profile} />
              : <Avatar className="profile-pic-box" user={profile} size="md" />
            }
          </div>
          <div className="col-sm-6 col-md-5 text-center text-right-md">
            <div className="group-inline">
              <ul className="shop-box list-inline">
                <li className="name">Shop</li>
                <Avatar link="#" tag="li" />
                <Avatar link="#" tag="li" />
              </ul>
              <Buttons
                className="hidden-xs"
                profile={profile}
                isOwn={isOwner}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Header;
