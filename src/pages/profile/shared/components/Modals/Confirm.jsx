import React from 'react';
import withHandlers from 'recompose/withHandlers';

const Modal = ({
  title,
  body,
  onClose,
  onConfirm,
}) => (
  <div className="modal-content">
    <div className="modal-header">
      <button type="button" className="close" onClick={onClose}>
        <span>&times;</span>
      </button>
      <h4 className="modal-title">{title}</h4>
    </div>

    <div className="modal-body">
      <p>{body}</p>
    </div>

    <div className="modal-footer">
      <div className="text-right">
        <button className="btn btn-default" onClick={onClose}>Cancel</button>
        <button
          className="btn btn-danger"
          onClick={onConfirm}
        >
          Ok
        </button>
      </div>
    </div>
  </div>
);

export default withHandlers({
  onConfirm: ({ handleConfirm, onClose }) => () => {
    handleConfirm();
    onClose();
  },
})(Modal);
