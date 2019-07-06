import React from 'react';
import FormButtons from './FormButtons';

const Shop = ({
  onNext,
  onPrev,
}) => (
  <div className="container">
    <h4 className="text-center" style={{ margin: '150px 0' }}>Coming soon...</h4>

    <FormButtons
      onNext={onNext}
      onPrev={onPrev}
    />
  </div>
);

export default Shop;
