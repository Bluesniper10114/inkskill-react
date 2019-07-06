import React from 'react';
import FormButtons from '../FormButtons';
import QAItem from './Item';

const QA = ({
  questions,
  canNext,
  isLast,
  onChange,
  onPrev,
  onSubmit,
}) => (
  <div className="container">
    <div className="question-box">
      <ul>
        {questions.map((item, index) => (
          <li key={item.question}>
            <QAItem
              data={item}
              onChange={answer => onChange(index, { answer })}
            />
          </li>
        ))}
      </ul>
    </div>

    <FormButtons
      canNext={canNext}
      onNext={onSubmit}
      onPrev={onPrev}
      isLast={isLast}
    />
  </div>
);

export default QA;
