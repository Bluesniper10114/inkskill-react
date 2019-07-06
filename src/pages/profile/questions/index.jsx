import React from 'react';
import QuestionCard from './QuestionCardContainer';

const Index = ({ profile, isOwner }) => (
  <div className="row">
    <div className="col-lg-10 col-lg-offset-1">
      <div className="question-box">
        <ul>
          {isOwner && <li><QuestionCard data={{}} /></li>}
          {profile.questions.map(item => (
            <li key={item._id}>
              <QuestionCard data={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default Index;
