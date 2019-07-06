import React from 'react';
import { compose, withState, withHandlers, lifecycle, pure } from 'recompose';
import classNames from 'classnames';
import StarIcon from 'assets/svg/star-icon.svg';

const Rating = ({ value, count = 5, editing, handleStarClick }) => {
  const stars = [];
  for (let i = 1; i <= count; i += 1) {
    stars.push(
      <li
        key={i}
        onClick={() => handleStarClick(i)}
      >
        <StarIcon />
      </li>
    );
  }

  return (
    <ul className={classNames('list-inline rating-box', `star-${value}`, { editing })}>
      {stars}
    </ul>
  );
};

const enhance = compose(
  withState('value', 'setValue', ({ value }) => value),
  withHandlers({
    handleStarClick: ({ name, editing, setValue, onChange }) => (idx) => {
      if (!editing) return;
      setValue(idx);
      if (onChange) {
        onChange({ target: { name, value: idx } });
      }
    },
  }),
  pure,
  lifecycle({
    componentWillReceiveProps(nextProps) {
      const { value } = nextProps;
      if (value !== null && value !== this.props.value) {
        this.props.setValue(value);
      }
    },
  })
);

export default enhance(Rating);
