import React from 'react';
import { Spacer } from 'core/components';
import Dropdown from 'core/components/Dropdown';
import Button from 'core/components/Dropdown/Button';

import CameraIcon from 'assets/svg/camera-icon.svg';
import PeopleIcon from 'assets/svg/people-icon.svg';
import GroupIcon from 'assets/svg/group-icon.svg';

const SHARE_MENU = [
  { id: 1, label: 'Action' },
  { id: 2, label: 'Another action' },
  { id: 3, label: 'Something else here' },
  '---',
  { id: 4, label: 'Separated link' },
];

const button = ({ onClick }) => (
  <Button className="btn-gray" onClick={onClick}>
    <GroupIcon />
    Share with <span className="caret" />
  </Button>
);

const Form = () => (
  <form>
    <div className="top-section">
      <input type="text" placeholder="write something" />
    </div>
    <div className="bottom-section clearfix">
      <div className="col-xs-5 col-sm-6 text-left">

        <button className="btn btn-transp btn-option">
          <CameraIcon />
        </button>
        <button className="btn btn-transp btn-option">
          <PeopleIcon />
        </button>

      </div>
      <div className="col-xs-7 col-sm-6 text-right">
        <Dropdown
          button={button}
          items={SHARE_MENU}
          onSelect={id => console.log(id)}
        />
      </div>
      <Spacer type="hidden-sm" />
    </div>
  </form>
);

export default Form;
