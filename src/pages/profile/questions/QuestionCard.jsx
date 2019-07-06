import React from 'react';
import AnswerContainer from './AnswerContainer';
import QuestionContainer from './QuestionContainer';

const QuestionCard = ({
  data,
  form,
  onSaveQuestion,
  onSaveAnswer,
}) => (
  <div className="question-card">
    <div className="question row">
      <div className="col-sm-1 text-center">
        <div className="labeling">Q</div>
      </div>
      <div className="col-sm-11">
        <QuestionContainer
          text={form.question || data.question}
          onSave={onSaveQuestion}
        />
      </div>
    </div>
    {form.question && (
      <div className="answer row">
        <div className="col-sm-1 text-center">
          <div className="labeling">A</div>
        </div>
        <div className="col-sm-11">
          <AnswerContainer
            text={form.answer || data.answer}
            onSave={onSaveAnswer}
          />
        </div>
      </div>
    )}
  </div>
);

export default QuestionCard;
