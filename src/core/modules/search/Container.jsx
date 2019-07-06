import { connect } from 'react-redux';
import compose from 'recompose/compose';
import mapProps from 'recompose/mapProps';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import withKeyboard, { ESCAPE } from 'core/utils/keyboard';
import SearchField from './SearchField';
import { clear, change, preSearch, selectors } from './state';


export default compose(
  mapProps(props => ({
    ...props,
    onInheritChange: props.onChange,
  })),
  withState('showList', 'setVisible', false),
  withHandlers({
    handleChange: ({ onInheritChange, name }) => (value) => {
      onInheritChange({
        target: { value, name },
      });
    },
  }),
  connect(selectors.getSearchField, (dispatch, props) => ({
    onChange: ({ target }) => {
      const { value } = target;

      if (value.length >= 3) {
        dispatch(preSearch(value));
      } else {
        dispatch(clear());
      }

      dispatch(change(value));
      props.handleChange(value);
      props.setVisible(true);
    },
    onSelect: (item) => {
      dispatch(change(item.label));
      dispatch(clear());
      props.handleChange(item.label);
    },
  })),
  withKeyboard((key, { setVisible }) => {
    if (key === ESCAPE) setVisible(false);
  })
)(SearchField);
