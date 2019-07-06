import React from 'react';

const ReplyForm = ({ message, onChange, onSubmit, onClose }) => (
  <form className="post-reply-form">
    <textarea
      rows="4"
      value={message}
      onChange={onChange}
    />
    <button className="btn btn-danger" type="button" onClick={onSubmit}>Send</button>
    <button className="btn btn-default" type="button" onClick={onClose}>Cancel</button>
  </form>
);

export default ReplyForm;
