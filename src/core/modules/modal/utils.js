/* eslint-disable import/prefer-default-export */

import { connect } from 'react-redux';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import { actions as modal } from 'core/modules/modal';

export const withModal = (modalId, prop = 'onModal') => compose(
  connect(null, { showModal: modal.show }),
  withHandlers({
    [prop]: ({ showModal }) => (propsIn) => {
      // do not pass if `propsIn` is react event
      const props = propsIn && propsIn.nativeEvent ? {} : propsIn;

      return showModal({
        id: modalId,
        props,
      });
    },
  }),
);
