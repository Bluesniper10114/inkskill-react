import React from 'react';
import classNames from 'classnames';
import MobileHeader from './MobileHeader';
import BottomHeader from './BottomHeader';
import TopHeader from './TopHeader';

const Header = ({
  open,
  hidden,
  showSearch,
  onToggle,
  showSearchOverlay,
}) => (
  <header>
    <MobileHeader isOpen={open} onToggle={onToggle} />
    <div className={classNames('group-header', { open, 'with-search': showSearch })}>
      <TopHeader showSearchOverlay={showSearchOverlay} />
      <BottomHeader
        hidden={hidden}
        showSearch={showSearch}
        showSearchOverlay={showSearchOverlay}
      />
    </div>
  </header>
);

export default Header;
