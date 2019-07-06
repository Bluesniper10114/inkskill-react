// @flow

import React from 'react';
import renderComponent from 'recompose/renderComponent';
import slideable from '../dynamic/slideable';
import ImageSlide from './ImageSlide';
import LeftChevron from 'assets/svg/left-thin-chevron.svg';
import RightChevron from 'assets/svg/right-thin-chevron.svg';

const ArrowLeft = ({ onClick }) => (
  <span className="left carousel-control" onClick={onClick}>
    <LeftChevron />
  </span>
);

const ArrowRight = ({ onClick }) => (
  <span className="right carousel-control" onClick={onClick}>
    <RightChevron />
  </span>
);

const Slider = ({
  slides,
  className,
  slideComponent = ImageSlide,
  interval,
  Wrapper,
}) => {
  const Component = slideComponent;
  const options = {};

  if (interval) {
    options.autoplay = true;
    options.autoplaySpeed = interval;
  }

  return (
    <div className={className}>
      <div className="carousel slide">
        <Wrapper {...options} slide="li">
          {slides.map((slide, index) => (
            <div className="item active" key={index} >
              <Component content={slide} />
            </div>
          ))}
        </Wrapper>
      </div>
    </div>
  );
};

export default slideable({
  prevArrow: renderComponent(ArrowLeft),
  nextArrow: renderComponent(ArrowRight),
})(Slider);
