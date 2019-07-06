import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import withProps from 'recompose/withProps';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import { form } from 'core/modules/form';
import {
  cropImage,
  rotateImage,
  readImageFile,
  getMinSize,
  getImageError,
} from 'core/utils/images';
import { withStyles } from 'core/utils/graphql';
import withLoading from 'core/utils/loading';
import { withPostImage } from '../../utils';
import AddImage from './AddImage';


export default compose(
  withStyles,
  withState('useCrop', 'enableCrop', false),
  withState('loading', 'setLoading', true),
  withState('current', 'setCurrent', 0),
  withState('imageData', 'setImage', null),
  withState('defaultCrop', 'setDefaultCrop', null),
  withState('minSize', 'setSize', null),
  withState('error', 'setError', true),
  withState('crop', 'setCrop', null),
  withProps(({ files, current, styles }) => ({
    isMultiple: files.length > 1,
    isLast: files.length === current + 1,
    stylesOptions: styles.map(s => ({ value: s._id, label: s.name })),
  })),
  withPostImage,
  withHandlers({
    readImage: ({
      files,
      current,
      isMultiple,
      setImage,
      setSize,
      setDefaultCrop,
      setLoading,
      setError,
      useCrop,
      setCrop,
      onClose,
    }) => (index) => {
      const fileIndex = index || current;
      setLoading(true);

      readImageFile(files[fileIndex], (image) => {
        const fileSize = files[fileIndex] ? files[fileIndex].size : null;
        const error = getImageError(image, fileSize);
        const defaultCrop = { x: 0, y: 0, width: image.width, height: image.height };

        if (!isMultiple && error) {
          onClose();
          alert(error);
          return;
        }

        if (!useCrop) {
          setCrop(defaultCrop);
        }

        setSize(getMinSize(image));
        setDefaultCrop(defaultCrop);
        setImage(image.data);
        setError(getImageError(image, fileSize));
        setLoading(false);
      });
    },
    rotateImage: ({ imageData, useCrop, setImage, setSize, setCrop, setDefaultCrop }) => angle =>
      rotateImage(imageData, angle, (image) => {
        const defaultCrop = { x: 0, y: 0, width: image.width, height: image.height };

        if (!useCrop) {
          setCrop(defaultCrop);
        }

        setSize(getMinSize(image));
        setDefaultCrop(defaultCrop);
        setImage(image.data);
      }),
  }),
  withHandlers({
    onNext: ({ current, isLast, setCurrent, readImage, onClose }) => () => {
      if (isLast) {
        onClose();
      } else {
        const nextIndex = current + 1;
        setCurrent(nextIndex);
        readImage(nextIndex);
      }
    },
    rotateLeft: ({ rotateImage: rotate }) => () => {
      rotate(-90);
    },
    rotateRight: ({ rotateImage: rotate }) => () => {
      rotate(90);
    },
  }),
  withHandlers({
    onChangeCrop: ({ setCrop }) => ({ detail }) => setCrop(detail),
    toggleCrop: ({ useCrop, defaultCrop, enableCrop, setCrop }) => () => {
      const flag = !useCrop;
      setCrop(flag ? null : defaultCrop);
      enableCrop(flag);
    },
    handleSubmit: ({ crop, imageData, setLoading, postImage, onNext }) => (data) => {
      const image = cropImage(imageData, crop);
      setLoading(true);
      return postImage(Object.assign({}, data, { imageData: image }))
        .then(onNext);
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.readImage();
    },
  }),
  form({
    form: 'add_picture',
    autoClear: true,
    rules: {
      name: ['required', 'length:1,20'],
      style: ['required'],
    },
  }),
  withLoading(),
)(AddImage);
