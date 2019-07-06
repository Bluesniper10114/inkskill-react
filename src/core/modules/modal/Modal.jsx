import React from 'react';
import classNames from 'classnames';

const onContainerClick = close => ({ target }) => {
  if (target.id === 'modalContainer') close();
};

const Modal = ({ content, close, showCloseBtn, className }) => (
  <div
    className={classNames('modal fade in', className)}
    id="modalContainer"
    style={{ display: 'block', paddingLeft: 0, backgroundColor: 'rgba(44, 46, 50, 0.95)' }}
    onClick={onContainerClick(close)}
  >
    {showCloseBtn && (
      <button type="button" className="close-overlay" onClick={close}>
        ×
      </button>
    )}
    <div className="modal-dialog">
      {content}
    </div>
  </div>
);

export default Modal;
