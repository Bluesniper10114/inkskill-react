import React from 'react';
import SpeachIcon from 'assets/svg/speach-icon.svg';

const AddComment = ({ comment, onChange, onSubmit, updateRef }) => (
  <form onSubmit={onSubmit}>
    <div className="row no-pads">
      <div className="col-xs-9 col-sm-10">
        <input
          type="text"
          placeholder="Your comment here"
          value={comment}
          ref={updateRef}
          onChange={onChange}
        />
      </div>
      <div className="col-xs-3 col-sm-2">
        <button type="button" className="btn-danger" disabled={!comment.length} onClick={onSubmit}>
          + <SpeachIcon />
        </button>
      </div>
    </div>
  </form>
);

export default AddComment;
