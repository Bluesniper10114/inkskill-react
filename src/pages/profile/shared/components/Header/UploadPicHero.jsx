import React from 'react';
import IconCamera from 'assets/svg/camera-icon.svg';
import ImageInput, { withCrop } from 'core/components/ImageInput';

const UploadPicHero = ({
  user,
  onSelect,
}) => (
  <div className="upload-pic upload-pic-hero">
    <ImageInput
      className="input-file"
      onSelect={onSelect}
    />
    <label htmlFor="files">
      <IconCamera />
      <span className="add-image">
        Add <br /> Image
      </span>
    </label>
  </div>
);

export default withCrop({
  minWidth: 600,
  minHeight: 200,
  modalId: 'upload_pichero',
})(UploadPicHero);
