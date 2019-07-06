import React from 'react';
import compose from 'recompose/compose';
import branch from 'recompose/branch';
import renderNothing from 'recompose/renderNothing';
import { withAuth } from 'core/utils/auth';
import { SITE_URL } from 'core/config/env';
import EnthusiastIcon from 'assets/svg/enthusiast-icon.svg';
import ArtistIcon from 'assets/svg/artist-icon.svg';
import { Link } from './index';

const CreateAccount = () => (
  <div className="before-footer parallax">
    <div className="bg-overlay" />
    <div className="container">
      <div className="row">
        <div className="col-xs-12 text-center">
          <h4 className="title text-center">Create Account</h4>
          <h5 className="subtitle text-center">Pick which side do you want to be</h5>
          <ul className="group-inline">
            <li className="text-center">
              <div className="img-box">
                <ArtistIcon />
              </div>
              <div className="text-box">
                <span className="name">ARTIST</span>
                { SITE_URL !== 'http://www.inkskill.com' && (
                  <Link className="btn" to="/sign-up/artist">CREATE</Link>
                )}
              </div>
            </li>
            <li className="text-center">
              <div className="img-box">
                <EnthusiastIcon />
              </div>
              <div className="text-box">
                <span className="name">ENTHUSIAST</span>
                {SITE_URL !== 'http://www.inkskill.com' && (
                  <Link className="btn" to="/sign-up/enthusiast">CREATE</Link>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default compose(
  withAuth,
  branch(
    ({ auth }) => auth._id,
    renderNothing,
  )
)(CreateAccount);
