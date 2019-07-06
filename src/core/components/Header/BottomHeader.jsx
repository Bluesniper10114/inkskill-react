import React from 'react';
import { IndexLink } from 'react-router';
import classNames from 'classnames';
import pure from 'recompose/pure';
import { SITE_URL } from 'core/config/env';
import { Link } from 'core/components';
import SearchIconRaw from 'assets/svg/search-icon.svg';
import logo from 'assets/img/logo-original-small.gif';

const SearchIcon = pure(SearchIconRaw);

const BottomHeader = ({ hidden, showSearch, showSearchOverlay }) => (
  <div className={classNames('bottom-header', { 'hidden-up': hidden })}>
    <div className="container">
      <div className="row">
        <div className="col-md-2 hidden-xs hidden-sm">
          <Link to="/" className="img-box">
            <img src={logo} alt="InkSkill" />
          </Link>
        </div>
        <div
          className={classNames(
            'header-nav text-center text-right-md',
            `col-md-${showSearch ? 7 : 10}`
          )}
        >
          <ul className="list-inline">
            {SITE_URL !== 'http://www.inkskill.com' && (
              <li><IndexLink activeClassName="active" to="/">Home</IndexLink></li>
            )}
            <li><Link activeClassName="active" to="/blog">Blog</Link></li>
            <li><Link activeClassName="active" to="/about">About</Link></li>
            <li><Link activeClassName="active" to="/contact">Contact Us</Link></li>
          </ul>
        </div>
        {SITE_URL !== 'http://www.inkskill.com' && showSearch && (
          <div className="col-md-3">
            <div className="form-box">
              <input
                type="text"
                className="form-control search-input"
                placeholder=""
                onFocus={showSearchOverlay}
              />
              <div className="icon-box">
                <SearchIcon />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default BottomHeader;
