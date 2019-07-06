import React from 'react';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import { withModal } from 'core/modules/modal';
import ImageInput from 'core/components/ImageInput';
import IconCamera from 'assets/svg/camera-icon.svg';
import { Loader } from 'core/utils/loading';
import { withBulkUpload } from '../shared/utils';

const Button = ({ children, onClick }) => (
  <li>
    <button type="button" className="btn" onClick={onClick}>
      {children}
    </button>
  </li>
);

const AddPostCard = ({ loading, onSelect, onFacebook, onInstagram }) => (
  <div className="add-post-card">
    <div className="img-box">
      <IconCamera />
    </div>
    <ul>
      <li>
        <label className="btn">
          ADD PHOTO
          <ImageInput multiple onSelect={onSelect} />
        </label>
      </li>
      <Button onClick={onFacebook}>ADD FROM FACEBOOK</Button>
      <Button onClick={onInstagram}>ADD FROM INSTAGRAM</Button>
    </ul>
    {loading && <Loader />}
  </div>
);

export default compose(
  withModal('add_image'),
  withBulkUpload,
  withHandlers({
    onSelect: ({ onModal, bulkUpload }) => (filesToUpload) => {
      const files = Array.from(filesToUpload);

      if (files.length === 1) {
        onModal({ files });
      } else {
        bulkUpload(files);
      }
    },
  })
)(AddPostCard);
