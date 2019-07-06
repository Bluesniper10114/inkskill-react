import React from 'react';
import classNames from 'classnames';
import { Spacer } from 'core/components';
import SearchIcon from 'assets/svg/search-icon.svg';
import SearchField from './SearchField';
import StyleSelector from './StyleSelectorContainer';

const SpacerXS = () => (
  <div className="col-xs-12 hidden-md hidden-lg">
    <Spacer />
  </div>
);

const getStylesValue = (styles = []) => {
  if (!styles.length) {
    return 'Not selected';
  } else if (styles.length === 1) {
    return styles[0].name;
  }

  return `${styles.length} style sections`;
};

const SearchBox = ({
  isOverlay,
  styleOpen,
  data,
  onChange,
  onSubmit,
  onSelectStyles,
  toggleStyleOpen,
}) => (
  <div>
    <form className={isOverlay ? 'search-box-overlay' : 'search-box'} onSubmit={onSubmit}>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <SearchField
              className="form-group"
              name="artist_name"
              onChange={onChange}
            />
          </div>
          <div className="col-md-1 text-center">
            <span className="delimiter-or">or</span>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                value={getStylesValue(data.styles)}
                onClick={toggleStyleOpen}
                readOnly
              />
              <div className="icon-box">
                <span className="triangle" />
              </div>
              <span className={classNames('carrot', { visible: styleOpen })} />
            </div>
          </div>
          {!isOverlay && <SpacerXS />}
          <div className="col-md-2">
            <div className="form-group">
              <input
                name="zipcode"
                type="text"
                className="form-control"
                placeholder="Zip Code"
                value={data.zipcode || ''}
                onChange={onChange}
              />
            </div>
          </div>
          {!isOverlay && <SpacerXS />}
          <div className="col-md-1">
            <div className="btn-box">
              <button
                type="submit"
                className={classNames('btn', (isOverlay ? 'btn-danger' : 'btn-dark'))}
              >
                <SearchIcon className="white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
    <StyleSelector
      open={styleOpen}
      onSelect={onSelectStyles}
      toggleOpen={toggleStyleOpen}
    />
  </div>
);

export default SearchBox;
