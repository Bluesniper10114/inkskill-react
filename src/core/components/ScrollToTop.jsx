import React from 'react';
import classNames from 'classnames';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import withScroll from 'core/utils/scroll';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import { smoothScroll } from 'core/utils/dom';
import Icon from 'assets/svg/fa/chevron-up.svg';

const IconChevron = pure(Icon);

const ScrollToTop = ({ visible, scrollTop }) => (
  <div
    className={classNames('scroll-to-top', { visible })}
    onClick={scrollTop}
  >
    <IconChevron />
  </div>
);

export default compose(
  pure,
  withState('visible', 'setVisibility', false),
  withHandlers({
    scrollTop: () => () => smoothScroll(500, document.body),
  }),
  withScroll(({ top }, { setVisibility }) => {
    setVisibility(top >= 100);
  }),
  onlyUpdateForKeys(['visible']),
)(ScrollToTop);
