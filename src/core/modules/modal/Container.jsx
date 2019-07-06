import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import { toggleBodyClass } from 'core/utils/dom';
import { get } from 'core/utils/modalsRegistry';
import withKeyboard, { ESCAPE } from 'core/utils/keyboard';
import * as actions from './state/index';
import { getModals } from './state/selectors';
import Overlay from './Overlay';
import Modal from './Modal';

const types = {
  overlay: Overlay,
  modal: Modal,
};

const ModalItem = ({ id, props, hide }) => {
  const { type, component: ModalComponent, className, showCloseBtn } = get(id);
  const Wrapper = types[type];
  const close = () => hide();

  if (!Wrapper) return null;
  const content = <ModalComponent {...props} onClose={close} />;

  return (
    <Wrapper
      content={content}
      className={className}
      showCloseBtn={showCloseBtn}
      close={close}
    />
  );
};

const ModalContainer = ({ modals, hide }) => (
  <div>
    {modals.map(item => (
      <ModalItem
        key={item.id}
        id={item.id}
        props={item.props}
        hide={hide}
      />
    ))}
  </div>
);

export default compose(
  connect(getModals, actions),
  lifecycle({
    componentWillReceiveProps({ modals }) {
      if (modals.length === this.props.modals.length) return;

      toggleBodyClass('modal-open', !!modals.length);
    },
  }),
  withKeyboard((key, { hide }) => {
    if (key === ESCAPE) hide();
  }),
)(ModalContainer);
