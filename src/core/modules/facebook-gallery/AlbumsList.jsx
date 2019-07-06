import React from 'react';
import { connect } from 'react-redux';
import { fetchPhotos, selectors } from './state';

const AlbumsList = ({ albums, onSelectAlbum }) => (
  <div className="facebook-gallery">
    <ul>
      {albums.map(album => (
        <li
          key={album.id}
          style={{ backgroundImage: `url(${album.cover})` }}
          onClick={() => onSelectAlbum(album)}
        >
          <span className="picture-label">
            {album.name}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

export default connect(
  selectors.getFacebookGallery,
  { onSelectAlbum: fetchPhotos }
)(AlbumsList);
