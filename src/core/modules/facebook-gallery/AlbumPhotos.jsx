import React from 'react';
import classNames from 'classnames';

const Photo = ({ data, selected, onClick }) => (
  <li
    className={classNames({ selected, invalid: !data.valid })}
    style={{ backgroundImage: `url(${data.preview})` }}
    onClick={() => data.valid && onClick(data.id)}
  >
    <span className="picture-label">
      {data.valid ? data.name : 'Too small size'} &nbsp;
    </span>
  </li>
);

const AlbumPhotos = ({
  photos,
  selection,
  onBack,
  clearAll,
  selectAll,
  toggleSelection,
}) => (
  <div className="facebook-gallery">
    <div className="row">
      <div className="col-xs-4">
        {onBack && <button className="btn btn-default" onClick={onBack}>← Albums</button>}
      </div>
      <div className="col-xs-8 text-right">
        <button className="btn btn-default" onClick={selectAll}>Select All</button>
        <button className="btn btn-default" onClick={clearAll}>Clear All</button>
      </div>
    </div>
    <ul>
      {photos.map(photo => (
        <Photo
          key={photo.id}
          data={photo}
          selected={selection.includes(photo.id)}
          onClick={toggleSelection}
        />
      ))}
    </ul>
  </div>
);

export default AlbumPhotos;
