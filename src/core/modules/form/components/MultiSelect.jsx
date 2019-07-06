import React from 'react';
import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import Select from 'react-select';
import 'react-select/scss/default.scss';

const makeEvent = (name, value, limit) => {
  let nextValue = value.map(v => v.value);
  const length = nextValue.length;

  if (length > limit) {
    nextValue = nextValue.slice(0, limit - 1).concat(nextValue[length - 1]);
  }

  return ({
    target: {
      name,
      value: nextValue,
    },
  });
};

const MultiSelect = ({
  name,
  error,
  warning,
  onSelect,
  onClose,
  ...props
}) => (
  <div className="form-group">
    {warning && <span className="error">{warning}</span>}
    <Select
      {...props}
      multi
      name={name}
      searchable={false}
      onChange={onSelect}
      onClose={onClose}
    />
    {error && <span className="error">{error}</span>}
  </div>
);

MultiSelect.defaultProps = {
  limit: Number.MAX_SAFE_INTEGER,
};

export default compose(
  withState('warning', 'setWarning', null),
  withHandlers({
    onSelect: ({ name, limit, onChange, setWarning }) => (selection) => {
      if (selection.length > limit) {
        setWarning(`Styles are limited to ${limit}`);
      }

      onChange(makeEvent(name, selection, limit));
    },
    onClose: ({ setWarning }) => () => {
      setWarning(null);
    },
  }),
)(MultiSelect);
