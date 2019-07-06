import React from 'react';

const AnswerField = ({ value, useButton = true, onChange, onBlur, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <input
      type="text"
      name="answer"
      placeholder="your answer"
      value={value}
      onBlur={onBlur}
      onChange={onChange}
    />
    {useButton && (
      <div className="text-right">
        <button disabled={!value.length} className="btn btn-danger">SAVE</button>
      </div>
    )}
  </form>
);

export default AnswerField;
