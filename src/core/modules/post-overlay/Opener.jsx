import React from 'react';
import classNames from 'classnames';
import compose from 'recompose/compose';
import branch from 'recompose/branch';
import renderComponent from 'recompose/renderComponent';
import withHandlers from 'recompose/withHandlers';
import pick from 'lodash/pick';
import { connect } from 'react-redux';
import { actions as modal } from 'core/modules/modal';
import { getPostUrl } from 'core/utils/posts';
import { Link } from 'core/components';
import { selectors } from './state';
import { MODAL_ID } from './constants';

const Opener = ({ children, className, onOpen }) => (
  <div className={classNames('opener', className)} onClick={onOpen}>
    {children}
  </div>
);

const LinkOpener = ({ children, className, id }) => (
  <Link className={classNames('opener', className)} to={getPostUrl(id)}>
    {children}
  </Link>
);

export default compose(
  connect(selectors.getOverlayData, dispatch => ({ dispatch })),
  branch(({ useLink, updateUrl }) => useLink && updateUrl, renderComponent(LinkOpener)),
  withHandlers({
    onOpen: ({ dispatch, useLink, ...props }) => () => {
      if (useLink) return;

      dispatch(modal.show({
        id: MODAL_ID,
        props: pick(props, 'id', 'track', 'updateUrl'),
      }));
    },
  })
)(Opener);
