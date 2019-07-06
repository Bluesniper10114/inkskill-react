import { connect } from 'react-redux';
import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import { actions as modal } from 'core/modules/modal';
import { search } from './state';
import SearchBox from './SearchBox';

export default compose(
  connect(null, { search, close: modal.hide }),
  withState('data', 'handleData', { styles: [] }),
  withState('styleOpen', 'toggleStyle', false),
  withHandlers({
    onChange: ({ data, handleData }) => ({ target }) => {
      handleData({ ...data, [target.name]: target.value });
    },
    onSubmit: ({ data, search: runSearch, isOverlay, close }) => (event) => {
      event.preventDefault();
      if (isOverlay) close();

      runSearch({
        ...data,
        styles: data.styles.map(s => s.id).join(','),
      });
    },
    onSelectStyles: ({ data, handleData }) => styles =>
      handleData({ ...data, styles }),
    toggleStyleOpen: ({ styleOpen, toggleStyle }) => () =>
      toggleStyle(!styleOpen),
  })
)(SearchBox);
