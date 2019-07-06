import React from 'react';
import classNames from 'classnames';
import { withAuth } from 'core/utils/auth';
import { SITE_URL } from 'core/config/env';``
import Link from '../Link';
import { Menu, MobileMenu } from './Menu';
import GuestMenu from './GuestMenu';
import WhiteLogo from './WhiteLogo';


const TopHeader = ({ auth, isAuthenticated, logout, showSearchOverlay }) => (
  <div className="top-header">
    <div className="container">
      <div className="row">
        <div className="col-md-5 text-center text-left-md">
          <ul>
            {isAuthenticated && <li className="visible-desktop"><WhiteLogo /></li>}
            <li><Link>Tatoo shop directory</Link></li> {' '}
            <li><Link>Convention directory</Link></li>
          </ul>
        </div>
        <div className="col-md-2 text-center">
          <Link className={classNames({ 'hidden-desktop': isAuthenticated })}>
            <b>Become a blogger</b>
          </Link>
          {isAuthenticated && <Link className="visible-desktop" to="/blog"><b>Blog</b></Link>}
        </div>
        {SITE_URL !== 'http://www.inkskill.com' && (
          <div className="col-md-5 text-center text-right-md menu-container">
            {isAuthenticated && <MobileMenu user={auth} logout={logout} />}
            {isAuthenticated
              ? <Menu user={auth} logout={logout} onSearch={showSearchOverlay} />
              : <GuestMenu />
            }
          </div>
        )}
      </div>
    </div>
  </div>
);

export default withAuth(TopHeader);
