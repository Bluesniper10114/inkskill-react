/* eslint-disable import/prefer-default-export */

import { connect } from 'react-redux';
import { actions as modal } from 'core/modules/modal';
import { register } from 'core/utils/modalsRegistry';
import SearchForm from './SearchForm';

const modalId = 'home_search';
register(modalId, { type: 'overlay', component: SearchForm });

export const withSearchOverlay = connect(null, dispatch => ({
  showSearchOverlay: () => dispatch(modal.show({ id: modalId })),
}));
