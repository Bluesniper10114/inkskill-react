import React from 'react';
import Dropdown from '../Dropdown';
import Button from '../Dropdown/Button';
import EllipsisIcon from 'assets/svg/ellipsis-icon.svg';

const button = ({ onClick }) => (
  <Button className="btn-transp" onClick={onClick}>
    <EllipsisIcon className="gray" />
  </Button>
);

const PostMenu = ({ items, onMenuSelect }) => (
  <Dropdown
    className="dropup right"
    items={items}
    button={button}
    onSelect={onMenuSelect}
  />
);

export default PostMenu;
