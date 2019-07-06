import throttle from 'lodash/throttle';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import withProps from 'recompose/withProps';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import { form } from 'core/modules/form';
import { withPostVideo } from '../../utils';
import AddVideo from './AddVideo';

export default compose(
  withState('isSupported', 'setSupported', false),
  withState('current', 'setCurrent', 0),
  withState('videoPath', 'setVideo', null),
  withState('summaryError', 'setError', null),
  withState('position', 'savePosition', 0),
  withProps(({ files, current }) => ({
    isMultiple: files.length > 1,
    isLast: files.length === current + 1,
  })),
  withPostVideo,
  withHandlers({
    readVideo: ({ files, current, setVideo, savePosition, setSupported }) => (index) => {
      const fileIndex = index || current;
      const file = files[fileIndex];
      const path = URL.createObjectURL(file);
      const video = document.createElement('video');
      const isSupported = !!video.canPlayType(file.type);

      setSupported(isSupported);
      setVideo(path);
      savePosition(0);
    },
  }),
  withHandlers({
    onNext: ({ current, isLast, setCurrent, readVideo, onClose }) => () => {
      if (isLast) {
        onClose();
      } else {
        const nextIndex = current + 1;
        setCurrent(nextIndex);
        readVideo(nextIndex);
      }
    },
  }),
  withHandlers({
    onTimeUpdate: ({ savePosition }) =>
      throttle(({ target }) => target && savePosition(target.currentTime), 500),
    handleSubmit: ({
      files,
      current,
      position,
      onNext,
      setError,
      postVideo,
    }) => (data) => {
      const postData = Object.assign({ position }, data);
      setError(null);

      return postVideo(postData, files[current]).then(() => {
        onNext();
      }).catch((error) => {
        setError(error.error);
      });
    },
  }),
  lifecycle({
    componentWillMount() {
      this.props.readVideo();
    },
  }),
  form({
    form: 'add_video',
    autoClear: true,
    rules: {
      name: ['required', 'length:1,20'],
    },
  }),
)(AddVideo);
