import update from 'immutability-helper';
import findIndex from 'lodash/findIndex';
import { graphql } from 'react-apollo';
import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import { cleanTypeNames } from 'core/utils/graphql';
import { withUsername } from 'core/utils/auth';
import QuestionCard from './QuestionCard';
import QuestionsQuery from '../shared/graphql/Questions.graphql';
import SaveQuestionMutation from '../shared/graphql/SaveQuestion.graphql';

export default compose(
  withUsername,
  graphql(SaveQuestionMutation, {
    props: ({ mutate }) => ({
      onSave: data => mutate({ variables: { data: cleanTypeNames(data) } }),
    }),
    options: ({ username, data: question }) => ({
      update: (proxy, { data }) => {
        const queryData = proxy.readQuery({
          query: QuestionsQuery,
          variables: { username },
        });

        const { questions } = queryData.profile;
        const newData = data.saveQuestion;

        if (!question._id) {
          questions.push(newData);
        } else {
          const index = findIndex(questions, { _id: newData._id });
          queryData.profile.questions = update(questions, {
            $splice: [[index, 1, newData]],
          });
        }

        proxy.writeQuery({ query: QuestionsQuery, data: queryData });
      },
    }),
  }),
  withState('form', 'setForm', props => props.data),
  withHandlers({
    onChange: ({ setForm, form, onSave }) => (change) => {
      const newForm = Object.assign({}, form, change);

      if (form._id) {
        onSave(newForm);
        setForm(newForm);
      } else if (newForm.answer) {
        onSave(newForm);
        setForm({ answer: '', question: '' });
      } else {
        setForm(newForm);
      }
    },
  }),
  withHandlers({
    onSaveQuestion: ({ onChange }) => question => onChange({ question }),
    onSaveAnswer: ({ onChange }) => answer => onChange({ answer }),
  })
)(QuestionCard);
