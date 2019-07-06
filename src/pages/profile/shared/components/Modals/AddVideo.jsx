/* eslint-disable react/no-unescaped-entities */

import React from 'react';
import { TextField, TextArea } from 'core/modules/form';

const SaveButton = ({ progress, disabled, label = 'SAVE' }) => (
  <button type="submit" className="btn btn-danger" disabled={disabled}>
    {progress !== null ? progress : label}
  </button>
);

const MultipleButtons = ({
  canSave,
  isLast,
  progress,
  onSkip,
}) => (
  <div className="form-buttons">
    <button type="button" className="btn btn-default" onClick={onSkip}>SKIP</button> {' '}
    <SaveButton
      progress={progress}
      disabled={!canSave}
      label={isLast ? 'SAVE' : 'SAVE and CONTINUE'}
    />
  </div>
);


const AddVideo = ({
  files,
  current,
  isMultiple,
  isLast,
  isSupported,
  data,
  errors,
  summaryError,
  videoPath,
  progress,
  onClose,
  onChange,
  onTimeUpdate,
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
        {isSupported
          ? (
            <div className="video-box">
              <video
                src={videoPath}
                controls
                onTimeUpdate={onTimeUpdate}
              />
              <p className="help-block">
                You can select video time position,
                and that will be used for thumbnail.
              </p>
            </div>
          ) : (
            <div className="video-box">
              Unfortunately this video can't be previewed, but still can be uploaded.
            </div>
          )}
        {summaryError && <p className="error">{summaryError}</p>}
        <form onSubmit={onSubmit}>
          <fieldset disabled={progress !== null}>
            <TextField
              name="name"
              value={data.name}
              error={errors.name}
              placeholder="Title"
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
                canSave={!summaryError}
                isLast={isLast}
                onSkip={onNext}
                progress={progress}
              />
              : <SaveButton progress={progress} disabled={summaryError} />
            }
          </fieldset>
        </form>
      </div>
    </div>
  </div>
);

export default AddVideo;
