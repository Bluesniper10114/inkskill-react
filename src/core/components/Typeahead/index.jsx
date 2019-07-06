import compose from 'recompose/compose';
import mapProps from 'recompose/mapProps';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import withKeyboard, { ESCAPE, ARROWS, ENTER } from 'core/utils/keyboard';
import SearchField from './SearchField';

export default compose(
  mapProps(props => ({
    ...props,
    onInheritChange: props.onChange,
  })),
  withState('term', 'setTerm', props => props.value || ''),
  withState('selected', 'setSelected', 0),
  withState('showList', 'setVisible', false),
  withHandlers({
    handleChange: ({ onInheritChange, name }) => (value) => {
      onInheritChange({ value, name });
    },
  }),
  withHandlers({
    moveSelection: ({ selected, suggestions, setSelected }) => (direction) => {
      const max = suggestions.length - 1;
      let newSelected = selected + direction;

      if (newSelected < 0) {
        newSelected = 0;
      } else if (newSelected > max) {
        newSelected = max;
      }

      setSelected(newSelected);
    },
    onChange: props => ({ target }) => {
      const { value } = target;

      props.handleChange(value);
      props.setVisible(true);
      props.setTerm(value);
    },
    onSelect: props => (item) => {
      props.onSelect(item);
      props.setVisible(false);
      props.setTerm(item.label);
    },
  }),
  withKeyboard((key, {
    suggestions = [],
    showList,
    selected,
    setVisible,
    moveSelection,
    onSelect,
  }) => {
    if (!showList) return;

    // eslint-disable-next-line default-case
    switch (key) {
      case ESCAPE: setVisible(false); break;
      case ARROWS.UP: moveSelection(-1); break;
      case ARROWS.DOWN: moveSelection(1); break;
      case ENTER: if (suggestions[selected]) onSelect(suggestions[selected]); break;
    }
  })
)(SearchField);
