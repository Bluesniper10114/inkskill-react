import React from 'react';
import ShareIcon from 'assets/svg/share-icon.svg';
import Dropdown from '../Dropdown';
import Button from '../Dropdown/Button';

const SHARE_MENU = [
  { id: 1, label: 'Action' },
  { id: 2, label: 'Another action' },
  { id: 3, label: 'Something else here' },
  '---',
  { id: 4, label: 'Separated link' },
];
const button = ({ onClick }) => (
  <Button className="btn-transp" onClick={onClick}>
    <ShareIcon className="gray" />
  </Button>
);

const ShareMenu = () => (
  <Dropdown
    className="dropup"
    button={button}
    items={SHARE_MENU}
    onSelect={id => console.log(id)}
  />
);

export default ShareMenu;
