import React from 'react';
import pure from 'recompose/pure';
import MenuIconRaw from 'assets/svg/menu-icon.svg';
import IconXMark from 'assets/svg/x-mark.svg';
import WhiteLogo from './WhiteLogo';

const MenuIcon = pure(MenuIconRaw);
const MobileHeader = ({ isOpen, onToggle }) => (
  <div className="hidden-md hidden-lg mobile-header">
    <div className="row">
      <div className="col-xs-6">
        <WhiteLogo />
      </div>
      <div className="col-xs-6 text-right">
        <button className="btn btn-transp group-header-trigger" onClick={onToggle}>
          {isOpen ? <IconXMark className="white" /> : <MenuIcon />}
        </button>
      </div>
    </div>
  </div>
);

export default MobileHeader;
