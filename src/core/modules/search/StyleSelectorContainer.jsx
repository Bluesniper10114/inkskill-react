import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import lifecycle from 'recompose/lifecycle';
import clickOutside from 'core/utils/clickOutside';
import StyleSelector from './StyleSelector';
import { withStyles } from 'core/utils/graphql';

export default compose(
  withStyles,
  withState('selection', 'setSelection', []),
  withHandlers({
    onChange: ({
      styles,
      selection,
      setSelection,
      onSelect,
    }) => ({ target }) => {
      const id = parseInt(target.value, 10);
      let newSelection;

      if (target.checked) {
        newSelection = [...selection, id];
      } else {
        const index = selection.indexOf(id);
        newSelection = [
          ...selection.slice(0, index),
          ...selection.slice(index + 1),
        ];
      }

      setSelection(newSelection);
      onSelect(styles.filter(style => newSelection.includes(style._id)));
    },
  }),
  clickOutside({
    trackOnMount: false,
    handler: ({ toggleOpen }) => toggleOpen(),
  }),
  lifecycle({
    componentWillReceiveProps({ open }) {
      if (open !== this.props.open) {
        this.props.setTracking(open);
      }
    },
  }),
)(StyleSelector);
