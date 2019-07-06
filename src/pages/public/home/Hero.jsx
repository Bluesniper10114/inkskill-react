import React from 'react';
import { withSearchOverlay } from 'core/modules/search';

const Hero = ({ showSearchOverlay }) => (
  <div className="hero parallax">
    <div className="text-box text-center">
      <h1 className="main-title">FIND THE BEST ARTIST NEARBY</h1>
      <h6 className="subtitle">
        Find an Artist, See their Ratings, Schedule an Appointment, Or Just Browse Cool Tattoo Pics!
      </h6>
      <span className="shortline-divider" />
      <button
        className="btn browse-btn btn-dark btn-lg search-artist-trigger"
        onClick={showSearchOverlay}
      >
        BROWSE ARTIST
      </button>
    </div>
  </div>
);

export default withSearchOverlay(Hero);
