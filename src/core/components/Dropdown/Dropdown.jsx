import React from 'react';
import classNames from 'classnames';
import Menu from './Menu';

const SimpleMenu = ({ className, children }) => (
  <ul className={classNames('dropdown-menu', className)}>
    {children}
  </ul>
);

const Dropdown = ({
  button: Button,
  menuClass,
  className,
  children,
  items,
  open,
  onToggle,
  onSelect,
}) => (
  <div className={classNames('btn-group', className, { open })}>
    <Button onClick={() => onToggle(!open)} />

    {open && (
      children
        ? <SimpleMenu className={menuClass}>{children}</SimpleMenu>
        : <Menu
          className={menuClass}
          items={items}
          onSelect={(value) => {
            onSelect(value);
            onToggle();
          }}
        />
    )}
  </div>
);

export default Dropdown;
