import React from 'react';

const QuestionField = ({ text, value, onChange, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <input
      type="text"
      name="question"
      placeholder="your question"
      value={text || value}
      onChange={onChange}
    />
    <div className="text-right">
      <button disabled={!value.length} className="btn btn-danger">ADD</button>
    </div>
  </form>
);

export default QuestionField;
