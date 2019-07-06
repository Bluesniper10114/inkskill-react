import React from 'react';
import classNames from 'classnames';
import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import withScroll from 'core/utils/scroll';
import logoImg from 'assets/img/logo-original-small.gif';

const Footer = ({ minimized, onClick }) => (
  <footer className={classNames({ minimized })} onClick={onClick}>
    <div className="container">
      <div className="row">
        <div className="logo-col col-md-2 text-center text-left-md">
          <div className="img-box"><img src={logoImg} /></div>
        </div>
        <div className="col-md-8 text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed tempor risus in nisl scelerisque, quis fermentum ante luctus.
          Fusce feugiat ac tellus vitae varius. Fusce faucibus, nisi sed
          placerat consequat, metus mauris tincidunt ante, at turpis duis
        </div>
        <div className="col-md-2 text-center text-right-md">
          <span>@inkskill {(new Date()).getFullYear()}</span>
        </div>
      </div>
    </div>
  </footer>
);

export default compose(
  withState('minimized', 'setMinimized', true),
  withHandlers({
    onClick: ({ minimized, setMinimized }) => () => setMinimized(!minimized),
  }),
  withScroll(({ bottom }, { setMinimized }) => {
    setMinimized(bottom >= 0);
  })
)(Footer);
