import React from 'react';
import XMarkIcon from 'assets/svg/x-mark.svg';

const Overlay = ({ content, close }) => (
  <div className="overlay artist-search">
    <div className="box">
      <button className="btn btn-transp close-btn close-overlay-trigger" onClick={close}>
        <XMarkIcon />
      </button>

      {content}
    </div>
  </div>
);

export default Overlay;
