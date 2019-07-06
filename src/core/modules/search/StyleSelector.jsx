import React from 'react';
import classNames from 'classnames';
import IconClose from 'assets/svg/x-mark.svg';

const Style = ({ data, selected, onChange }) => (
  <div className="col-sm-3">
    <label className={selected ? 'selected' : null}>
      <input
        type="checkbox"
        value={data._id}
        checked={selected}
        onChange={onChange}
      />
      {' '} {data.name}
    </label>
  </div>
);

const StyleSelector = ({
  open,
  styles,
  selection,
  onChange,
  toggleOpen,
}) => (
  <div className={classNames('style-selector', { open })}>
    <div className="container">
      <h4 className="page-header">
        Filter by Style
        <IconClose className="close" onClick={toggleOpen} />
      </h4>
      <div className="styles-list">
        {styles.map(style => (
          <Style
            key={style._id}
            data={style}
            selected={selection.includes(style._id)}
            onChange={onChange}
          />
        ))}
        <div className="col-xs-12">
          <button className="btn btn-lg btn-dark btn-block visible-xs" onClick={toggleOpen}>
            Done
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default StyleSelector;
