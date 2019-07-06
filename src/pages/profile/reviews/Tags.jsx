import React from 'react';
import capitalize from 'lodash/capitalize';
import includes from 'lodash/includes';
import isEqual from 'lodash/isEqual';
import map from 'lodash/map';
import filter from 'lodash/filter';
import toString from 'lodash/toString';
import classNames from 'classnames';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import withProps from 'recompose/withProps';
import pure from 'recompose/pure';

const Tag = ({ tag: { _id, tag, selected }, toggle }) =>
  <li
    className={classNames({ unselected: !selected })}
  >
    <a onClick={toggle(_id)}>{capitalize(tag)}</a>
  </li>;

const Tags = ({ tags, error, toggleTag }) =>
  <div className="tags-box">
    <p>The artist is...</p>
    <ul className="list-inline">
      {tags.map(tag => (
        <Tag key={tag._id} tag={tag} toggle={toggleTag} />
      ))}
    </ul>
    { error && <p className="error">{error}</p> }
  </div>;

const enhancer = compose(
  pure,
  withProps(({ maxCount }) => ({ maxCount: maxCount || 3 })),
  withState('error', 'setError', null),
  withState('timer', 'setTimer', null),
  withState('suggestions', 'setSuggestions', ({ options }) => options),
  withState('selectedTags', 'setSelectedTags', ({ value }) => value || []),
  withHandlers({
    toggleTag: ({ name, selectedTags, maxCount, setSelectedTags, setError, setTimer, onChange }) =>
      _id => () => {
        const tagId = toString(_id);
        // check if reach limit
        if (!includes(selectedTags, tagId) && selectedTags.length >= maxCount) {
          setError(`You can select only ${maxCount} tags or less.`);
          setTimer(setTimeout(() => {
            setError(null);
          }, 3000));
          return;
        }

        // if not, update
        setError(null);
        let updatedTags = selectedTags;
        if (includes(selectedTags, tagId)) {
          updatedTags = filter(selectedTags, tag => tag !== tagId);
        } else {
          updatedTags = [
            ...selectedTags,
            tagId,
          ];
        }

        setSelectedTags(updatedTags);

        onChange({
          target: {
            name,
            value: updatedTags,
          },
        });
      },
  }),
  withProps(({ suggestions, selectedTags }) => ({
    tags: map(
      suggestions,
      suggestion => Object.assign({}, suggestion, {
        selected: includes(selectedTags, suggestion._id) }
    )),
  })),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      const { options, value } = nextProps;

      if (!isEqual(this.props.options, options)) {
        this.props.setSuggestions(options);
      }

      if (!isEqual(this.props.value, value)) {
        this.props.setSelectedTags(value);
      }
    },
    componentWillUnmount() {
      const { timer } = this.props;
      if (timer) {
        clearTimeout(timer);
      }
    },
  })
);

export default enhancer(Tags);
