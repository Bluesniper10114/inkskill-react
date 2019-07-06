import React from 'react';
import get from 'lodash/get';
import { AvatarImage, getAvatar } from 'core/components/Avatar';
import ImageInput, { withCrop } from 'core/components/ImageInput';
import IconCamera from 'assets/svg/camera-icon.svg';
import UsePicture from './UsePicture';

const UploadAvatar = ({
  user,
  onSelect,
}) => (
  <div className="img-box profile-pic-box">
    <AvatarImage image={getAvatar(user, 'md')} />
    <div className="upload-pic">
      <ImageInput
        className="input-file"
        onSelect={onSelect}
      />
      <label htmlFor="files">
        <IconCamera />
        <span className="add-image">
          {user.avatarUrls ? 'Change' : 'Add'} <br /> Image
        </span>
      </label>
    </div>
    {get(user, 'urls.fb') && <UsePicture type="fb" />}
    {get(user, 'urls.ig') && <UsePicture type="ig" />}
  </div>
);

export default withCrop({
  minWidth: 256,
  minHeight: 256,
  modalId: 'upload_avatar',
})(UploadAvatar);
