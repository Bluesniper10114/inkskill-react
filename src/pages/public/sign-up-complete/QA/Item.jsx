import React from 'react';
import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import QuestionText from '../../../profile/questions/QuestionText';
import AnswerField from '../../../profile/questions/AnswerField';


const preventSubmit = event => event.preventDefault();

const Item = ({ data, answer, onAnswerChange }) => (
  <div className="question-card">
    <div className="question row">
      <div className="col-sm-1 text-center">
        <div className="labeling">Q</div>
      </div>
      <div className="col-sm-11">
        <QuestionText text={data.question} />
      </div>
    </div>
    <div className="answer row">
      <div className="col-sm-1 text-center">
        <div className="labeling">A</div>
      </div>
      <div className="col-sm-11">
        <AnswerField
          value={answer}
          useButton={false}
          onChange={onAnswerChange}
          onSubmit={preventSubmit}
        />
      </div>
    </div>
  </div>
);

export default compose(
  withState('answer', 'setAnswer', ({ data }) => data.answer || ''),
  withHandlers({
    onAnswerChange: ({ setAnswer, onChange }) => ({ target }) => {
      const value = target.value;
      setAnswer(value);
      onChange(value);
    },
  }),
)(Item);
