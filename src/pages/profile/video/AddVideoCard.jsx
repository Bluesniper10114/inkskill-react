import React from 'react';
import IconVideo from 'assets/svg/video.svg';
import { Loader } from 'core/utils/loading';

// safari requires certain list of accepted types
const accept = [
  'video/3gpp2',
  'video/3gpp',
  'video/x-ms-asf',
  'video/x-msvideo',
  'video/dv',
  'video/x-f4v',
  'video/x-flv',
  'video/x-m4v',
  'video/x-matroska',
  'video/quicktime',
  'video/mp4',
  'video/mpeg',
  'video/mpeg4-generic',
  'video/ogg',
  'video/mp2t',
  'video/x-ms-vob',
  'video/x-ms-wmv',
  'video/*',
];

const AddVideoCard = ({ value, loading, onYoutube, onSelect, onClick }) => (
  <div className="add-video-card">
    <div className="img-box">
      <IconVideo />
    </div>
    <ul>
      <li>
        <label className="btn" onClick={onClick}>
          ADD VIDEO
          <input
            type="file"
            className="hidden"
            accept={accept.join(', ')}
            value={value}
            multiple
            onChange={onSelect}
          />
        </label>
      </li>
      <li>
        <button type="button" className="btn" onClick={onYoutube}>
          ADD FROM YOUTUBE
        </button>
      </li>
    </ul>
    {loading && <Loader />}
  </div>
);

export default AddVideoCard;
