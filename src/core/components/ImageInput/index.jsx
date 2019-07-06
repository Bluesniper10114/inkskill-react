import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import ImageInput from './ImageInput';
import withCrop from './withCrop';

export { withCrop };

export default compose(
  withState('value', 'setValue', ''),
  withHandlers({
    onInputClick: ({ setValue }) => () => setValue(''),
    onSelectFile: ({ multiple, onSelect }) => ({ target }) => {
      const { files } = target;
      onSelect(multiple ? files : files[0]);
    },
  })
)(ImageInput);
