import update from 'immutability-helper';
import get from 'lodash/get';
import { graphql } from 'react-apollo';
import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import QA from './QA';
import SaveQuestionsMutation from './SaveQuestions.graphql';

const initialQuestions = [
  { question: 'How long have you been tattooing?' },
  { question: 'What got you into becoming a tattoo artist?' },
  { question: 'What has been your biggest challenge as an artist?' },
];

const validate = questions => questions.reduce((valid, q) =>
  valid && get(q, 'answer.length', false), true);

export default compose(
  withState('questions', 'updateQuestions', initialQuestions),
  withState('canNext', 'setCanNext', false),
  graphql(SaveQuestionsMutation, {
    props: ({ mutate, ownProps }) => ({
      onSubmit: () => mutate({ variables: { data: ownProps.questions } })
        .then(({ data }) => {
          ownProps.handleSubmit({});
          ownProps.updateQuestions(data.saveQuestions);
        }),
    }),
  }),
  withHandlers({
    onChange: ({ questions, updateQuestions, setCanNext }) => (index, change) => {
      const newQuestions = update(questions, {
        [index]: { $merge: change },
      });

      updateQuestions(newQuestions);
      setCanNext(validate(newQuestions));
    },
  }),
)(QA);
