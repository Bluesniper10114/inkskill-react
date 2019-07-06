import React from 'react';
import { graphql } from 'react-apollo';
import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import Cropper from 'react-cropper';
import { cropImage } from 'core/utils/images';
import { withUsername } from 'core/utils/auth';
import UpdateAvatarMutation from '../../graphql/UpdateAvatar.graphql';


const Modal = ({
  imageData,
  minSize,
  onChangeCrop,
  onClose,
  onSubmit,
}) => (
  <div className="modal-content">
    <div className="modal-header">
      <button type="button" className="close" onClick={onClose}>
        <span>&times;</span>
      </button>
      <h4 className="modal-title">Update Profile Picture</h4>
    </div>

    <div className="modal-body">
      <div className="group-box">
        <div className="img-box">
          <Cropper
            src={imageData}
            guides={false}
            crop={onChangeCrop}
            minCropBoxWidth={minSize}
            minCropBoxHeight={minSize}
            zoomable={false}
            aspectRatio={1}
          />
        </div>
      </div>
    </div>

    <div className="modal-footer">
      <button type="button" className="btn btn-default" onClick={onClose}>
        CANCEL
      </button>
      <button type="button" className="btn btn-danger" onClick={onSubmit}>
        SAVE
      </button>
    </div>
  </div>
);

export default compose(
  withUsername,
  withState('crop', 'setCrop', null),
  graphql(UpdateAvatarMutation),
  withHandlers({
    onChangeCrop: ({ setCrop }) => ({ detail }) => setCrop(detail),
    onSubmit: ({ crop, imageData, onClose, mutate, updateAuth }) => () => {
      mutate({
        variables: {
          imageData: cropImage(imageData, crop),
        },
      }).then(({ data }) => updateAuth(data.updateAvatar));

      onClose();
    },
  })
)(Modal);
