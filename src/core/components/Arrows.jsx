import React from 'react';
import classNames from 'classnames';
import pure from 'recompose/pure';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import ArrowLeftIcon from 'assets/svg/arrow-left.svg';
import ArrowRightIcon from 'assets/svg/arrow-right.svg';

const LeftArrow = ({ onClick, clicked }) => (
  <div
    className={classNames('arrow-control left-arrow', { clicked })}
    onClick={onClick}
  >
    <ArrowLeftIcon />
  </div>
);

const RightArrow = ({ onClick, clicked }) => (
  <div
    className={classNames('arrow-control right-arrow', { clicked })}
    onClick={onClick}
  >
    <ArrowRightIcon />
  </div>
);

const enhancer = onlyUpdateForKeys(['clicked']);
export const Left = pure(enhancer(LeftArrow));
export const Right = pure(enhancer(RightArrow));
