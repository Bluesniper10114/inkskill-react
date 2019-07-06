import React from 'react';
import classNames from 'classnames';

const FormButtons = ({ className, canNext = true, isLast, onPrev, onNext }) => (
  <div className={classNames('form-buttons', className)}>
    <div className="buttons-inner">
      {onPrev && (
        <button className="btn btn-default btn-lg" type="button" onClick={onPrev}>
          Previous
        </button>
      )}
      <button
        className="btn btn-danger btn-lg"
        type="button"
        disabled={!canNext}
        onClick={onNext}
      >
        {isLast ? 'Complete' : 'Next'}
      </button>
    </div>
  </div>
);

export default FormButtons;
