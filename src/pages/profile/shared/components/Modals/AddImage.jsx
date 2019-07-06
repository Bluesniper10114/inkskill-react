import React from 'react';
import Cropper from 'react-cropper';
import classNames from 'classnames';
import { form, TextField, TextArea, MultiSelect } from 'core/modules/form';

const SingleButton = ({ onClick }) => (
  <button type="button" className="btn btn-danger" onClick={onClick}>
    SAVE
  </button>
);

const MultipleButtons = ({
  canSave,
  isLast,
  onContinue,
  onSkip,
}) => (
  <div className="form-buttons">
    <button type="button" className="btn btn-default" onClick={onSkip}>SKIP</button> {' '}
    <button type="button" className="btn btn-danger" disabled={!canSave} onClick={onContinue}>
      {isLast ? 'SAVE' : 'SAVE and CONTINUE'}
    </button>
  </div>
);

const Modal = ({
  imageData,
  minSize,
  useCrop,
  files,
  current,
  error,
  isMultiple,
  isLast,
  data,
  errors,
  stylesOptions,
  toggleCrop,
  rotateLeft,
  rotateRight,
  onChange,
  onChangeCrop,
  onClose,
  onSubmit,
  onNext,
}) => (
  <div className="modal-content">
    {isMultiple && <strong>{current + 1} out of {files.length}</strong>}
    <button type="button" className="close" onClick={onClose}>
      <span>&times;</span>
    </button>
    <div className="modal-body">
      <div className="group-box">
        <div className="img-box">
          <span className={classNames('fa', useCrop ? 'fa-times' : 'fa-crop')} onClick={toggleCrop} />
          <span className="fa fa-undo" onClick={rotateLeft} />
          <span className="fa fa-repeat" onClick={rotateRight} />
          {!useCrop
            ? <img src={imageData} />
            : <Cropper
              src={imageData}
              guides={false}
              crop={onChangeCrop}
              minCropBoxWidth={minSize}
              minCropBoxHeight={minSize}
              zoomable={false}
              aspectRatio={1}
            />
          }
          {error && <span className="error">{error}</span>}
        </div>
        <form>
          <TextField
            type="text"
            name="name"
            value={data.name}
            error={errors.name}
            placeholder="Title"
            onChange={onChange}
          />
          <MultiSelect
            name="style"
            value={data.style}
            error={errors.style}
            placeholder="Style"
            options={stylesOptions}
            limit={3}
            onChange={onChange}
          />
          <TextArea
            name="desc"
            value={data.desc}
            error={errors.desc}
            placeholder="Description"
            onChange={onChange}
          />
          {isMultiple
            ? <MultipleButtons
              canSave={!error}
              isLast={isLast}
              onSkip={onNext}
              onContinue={onSubmit}
            />
            : <SingleButton onClick={onSubmit} />
          }
        </form>
      </div>
    </div>
  </div>
);

export default Modal;
