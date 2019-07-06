import update from 'immutability-helper';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import withHandlers from 'recompose/withHandlers';
import { withAuth } from 'core/utils/auth';
import EditUrls from './EditUrls';
import { withSocialConnect } from '../../utils';


export default compose(
  withAuth,
  withProps(({ onChange, onBlur }) => ({
    onInheritChange: onChange,
    onInheritBlur: onBlur,
  })),
  withSocialConnect,
  withHandlers({
    onChange: ({ urls, onInheritChange }) => ({ target }) => {
      const { name, value } = target;
      const newUrls = update(urls, { [name]: { $set: value } });

      onInheritChange({
        target: { name: 'urls', value: newUrls },
      });
    },
    onBlur: ({ urls, onInheritBlur }) => () => {
      onInheritBlur({
        target: { name: 'urls', value: urls },
      });
    },
  })
)(EditUrls);
