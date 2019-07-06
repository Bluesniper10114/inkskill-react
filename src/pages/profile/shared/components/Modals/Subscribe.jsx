import React from 'react';
import { compose, withHandlers } from 'recompose';
import { form, TextField } from 'core/modules/form';

const Modal = ({
  data,
  errors,
  onChange,
  handleClose,
  onSubmit,
}) => (
  <div className="modal-content">
    <form onSubmit={onSubmit}>
      <div className="modal-header">
        <button type="button" className="close" onClick={handleClose}>
          <span>&times;</span>
        </button>
        <h4 className="modal-title">Subscribe our Newsletter</h4>
      </div>

      <div className="modal-body">
        <p>Subscribe to our mailing list to get updates to your email inbox</p>
        <TextField
          type="text"
          name="email"
          value={data.email}
          error={errors.email}
          placeholder="Email"
          onChange={onChange}
        />
      </div>

      <div className="modal-footer">
        <div className="text-right">
          <button
            className="btn btn-danger"
            type="submit"
          >
            Subscribe
          </button>
        </div>
      </div>
    </form>
  </div>
);

export default compose(
  withHandlers({
    handleSubmit: ({ handleConfirm, onClose }) => (data) => {
      handleConfirm(data);
      onClose();
    },
    handleClose: ({ onClose }) => () => {
      localStorage.setItem('subscribed', JSON.stringify(false));
      onClose();
    },
  }),
  form({
    form: 'subscribe',
    autoClear: true,
    rules: {
      email: ['required', 'email'],
    },
  }),
)(Modal);
