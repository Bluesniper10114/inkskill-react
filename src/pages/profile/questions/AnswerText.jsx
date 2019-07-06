import React from 'react';
import IconEdit from 'assets/svg/edit-icon.svg';

const AnswerText = ({ text, onEdit }) => (
  <div className="answer-box">
    <p className="answer-text">{text}</p>
    <button className="btn edit-btn btn-transp" onClick={onEdit}>
      <IconEdit />
      <span>EDIT</span>
    </button>
  </div>
);

export default AnswerText;
