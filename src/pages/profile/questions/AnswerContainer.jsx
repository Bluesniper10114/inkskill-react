import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import branch from 'recompose/branch';
import renderComponent from 'recompose/renderComponent';
import AnswerField from './AnswerField';
import AnswerText from './AnswerText';

export default compose(
  withState('edit', 'setEdit', props => !props.text),
  withState('value', 'setValue', props => props.text || ''),
  withHandlers({
    onEdit: ({ setEdit }) => () => setEdit(true),
    onCancel: ({ setEdit }) => () => setEdit(false),
    onChange: ({ setValue }) => ({ target }) => setValue(target.value),
    onSubmit: ({ setEdit, value, onSave }) => (event) => {
      event.preventDefault();
      setEdit(false);
      onSave(value);
    },
  }),
  branch(props => props.edit, renderComponent(AnswerField))
)(AnswerText);
