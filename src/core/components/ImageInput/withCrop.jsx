import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import { withModal } from 'core/modules/modal';
import { readImageFile, getMinSize, getImageError } from 'core/utils/images';

export default ({ minWidth, minHeight, modalId }) => compose(
  withModal(modalId),
  withHandlers({
    showCrop: ({ onModal }) => (img) => {
      const error = getImageError(img, null, minWidth, minHeight);

      if (error) {
        // TODO replace with nice message box
        alert(error);
        return;
      }

      onModal({
        imageData: img.data,
        minSize: getMinSize(img, minWidth, minHeight),
      });
    },
  }),
  withHandlers({
    onSelect: ({ showCrop }) => file => readImageFile(file, showCrop),
  })
);

