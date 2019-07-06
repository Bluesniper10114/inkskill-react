import React from 'react';
import FormButtons from './FormButtons';
import ImagesList from '../../profile/images/ListContainer';

const Images = ({
  onNext,
  onPrev,
}) => (
  <div className="container">
    <FormButtons
      className="top"
      onNext={onNext}
      onPrev={onPrev}
    />

    <ImagesList updateUrl={false} />

    <FormButtons
      onNext={onNext}
      onPrev={onPrev}
    />
  </div>
);

export default Images;
