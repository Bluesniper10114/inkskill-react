import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import { withModal } from 'core/modules/modal';
import { withBulkVideoUpload } from '../shared/utils';
import AddVideoCard from './AddVideoCard';

export default compose(
  withModal('add_video'),
  withModal('youtube_import', 'onYoutube'),
  withState('value', 'setValue', ''),
  withBulkVideoUpload,
  withHandlers({
    onClick: ({ setValue }) => () => setValue(''),
    onSelect: ({ onModal, bulkUpload }) => ({ target }) => {
      const files = Array.from(target.files);

      if (files.length === 1) {
        onModal({ files });
      } else {
        bulkUpload(files);
      }
    },
  })
)(AddVideoCard);

