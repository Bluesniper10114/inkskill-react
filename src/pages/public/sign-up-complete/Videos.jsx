import React from 'react';
import FormButtons from './FormButtons';
import VideosList from '../../profile/video/ListContainer';

const Videos = ({
  isLast,
  onNext,
  onPrev,
  handleSubmit,
}) => (
  <div className="container">
    <FormButtons
      className="top"
      onNext={isLast ? handleSubmit : onNext}
      onPrev={onPrev}
      isLast={isLast}
    />

    <VideosList updateUrl={false} />

    <FormButtons
      onNext={isLast ? handleSubmit : onNext}
      onPrev={onPrev}
      isLast={isLast}
    />
  </div>
);

export default Videos;
