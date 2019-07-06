// @flow

import React from 'react';
import createFactory from '../../utils/createFactory';
import Slider from 'react-slick';
import createRecomposeHelper from "../../utils/createRecomposeHelper";

type Props = { children: any };
type Options = {
  timeout: number,
  size: number,
  prevArrow: React$Element<any>,
  nextArrow: React$Element<any>,
}

export const SlidesWrapper = ({
  timeout = 500,
  size = 1,
  ...options
}: Options) => ({ children, ...props }: Props) => {
  const settings = {
    infinite: true,
    speed: timeout,
    slidesToShow: size,
    slidesToScroll: 1,
    ...options,
  };
  return (
    <Slider {...settings} {...props}>
      {children}
    </Slider>
  );
};

const slideable = (options: Options) => (BaseComponent) => {
  const factory = createFactory(BaseComponent);

  return props => factory({
    ...props,
    Wrapper: SlidesWrapper(options),
  });
};

export default createRecomposeHelper(slideable, 'slideable');

