import { createSelector } from 'reselect';

export const modalsList = state => state.modal;
export const firstModal = createSelector(modalsList, modals => modals[0]);
export const getModals = createSelector(modalsList, modals => ({ modals }));
