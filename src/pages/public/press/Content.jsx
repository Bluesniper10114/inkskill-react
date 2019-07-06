import React from 'react';
import { Spacer } from 'core/components';

import DownloadIcon from 'assets/svg/download-icon.svg';
import logoPress from 'assets/img/logo-press.jpg';
import officePic from 'assets/img/office-pic.jpg';

const Content = () => (
  <div className="container single-page-box">

    <Spacer type="tall" />

    <div className="row">
      <div className="col-md-2 col-md-offset-1 name text-right-md">
        BRAND ASSETS.
      </div>

      <Spacer type="tall hidden-md hidden-lg" />

      <div className="col-md-4">
        <div className="press-card">
          <div className="img-box">
            <img src={logoPress} alt="Logo Press" />
          </div>
          <div className="text-box row no-pads">
            <div className="col-xs-6">
              <span className="title">Logo</span>
            </div>
            <div className="col-xs-6 text-right">
              <button className="btn-transp btn">
                <DownloadIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="press-card">
          <div className="img-box">
            <img src={officePic} alt="Office" />
          </div>
          <div className="text-box row no-pads">
            <div className="col-xs-6">
              <span className="title">Logo</span>
            </div>
            <div className="col-xs-6 text-right">
              <button className="btn-transp btn">
                <DownloadIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Spacer />

    <div className="row">
      <div className="col-xs-12">
        <hr />
      </div>
    </div>

    <Spacer />

    <div className="row">
      <div className="col-md-2 col-md-offset-1 name text-right-md">
        BRAND ASSETS.
      </div>

      <Spacer type="tall hidden-md hidden-lg" />

      <div className="col-md-4">
        <div className="press-card">
          <button className="btn btn-kit">
            <DownloadIcon />
          </button>
        </div>
      </div>
      <div className="col-md-4" />
    </div>

  </div>
);

export default Content;
