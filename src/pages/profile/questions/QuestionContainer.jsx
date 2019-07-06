import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import branch from 'recompose/branch';
import renderComponent from 'recompose/renderComponent';
import QuestionField from './QuestionField';
import QuestionText from './QuestionText';

export default compose(
  withState('value', 'setValue', props => props.text || ''),
  withHandlers({
    onChange: ({ setValue }) => ({ target }) => setValue(target.value),
    onSubmit: ({ value, onSave, setValue }) => (event) => {
      event.preventDefault();
      onSave(value);
      setValue('');
    },
  }),
  branch(props => !props.text, renderComponent(QuestionField))
)(QuestionText);
