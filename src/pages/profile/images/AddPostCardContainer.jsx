import compose from 'recompose/compose';
import { withCrop } from 'core/components/ImageInput';
import { withModal } from 'core/modules/modal';
import AddPostCard from './AddPostCard';

export default compose(
  withModal('facebook_import', 'onFacebook'),
  withModal('instagram_import', 'onInstagram'),
  withCrop({
    minWidth: 500,
    minHeight: 500,
    modalId: 'add_image',
  }),
)(AddPostCard);
