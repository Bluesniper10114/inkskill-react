import React from 'react';
import { Spacer, Link } from 'core/components';

import MapMarkerIcon from 'assets/svg/map-marker.svg';
import TelephoneIcon from 'assets/svg/telephone.svg';
import EnvelopeIcon from 'assets/svg/envelope.svg';
import TwIcon from 'assets/svg/tw-icon.svg';
import FbIcon from 'assets/svg/fb-icon.svg';
import GpIcon from 'assets/svg/gp-icon.svg';
import IgIcon from 'assets/svg/ig-icon.svg';

const ContactForm = () => (
  <div className="container">
    <div className="contact-us-box">
      <div className="row">
        <div className="col-md-7">
          <div className="row">
            <div className="col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2">
              <form>
                <Spacer type="giant hidde" />
                <div className="form-group">
                  <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Name" />
                </div>
                <div className="form-group">
                  <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
                </div>
                <div className="form-group">
                  <textarea className="form-control" rows="6" placeholder="Note" />
                </div>
                <div className="text-right">
                  <button type="submit" className="btn btn-danger btn-lg">Submit</button>
                </div>
                <Spacer type="tall hidde" />
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <div className="contact-info">
            <h4 className="title">CONTACT INFORMATION</h4>

            <Spacer />
            <Spacer type="hidden-md" />
            <Spacer type="giant hidden-xs hidden-sm" />

            <ul className="contact-data">
              <li>
                <div className="img-box">
                  <MapMarkerIcon />
                </div>
                <span>PO Box 430 Elberta, AL 36530</span>
              </li>
              <li>
                <div className="img-box">
                  <TelephoneIcon />
                </div>
                <span>(718)-340-8104</span>
              </li>
              <li>
                <div className="img-box">
                  <EnvelopeIcon />
                </div>
                <span>liccy@inkskill.com</span>
              </li>
            </ul>

            <Spacer type="giant hidden-xs hidden-sm" />
            <Spacer type="hidden-md" />

            <ul className="list-inline social-media text-center text-right-md">
              <li><Link><TwIcon /></Link></li>
              <li><Link><FbIcon /></Link></li>
              <li><Link><GpIcon /></Link></li>
              <li><Link><IgIcon /></Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ContactForm;
