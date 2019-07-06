import { register } from 'core/utils/modalsRegistry';
import reducer, { actions, selectors } from './state';
import { MODAL_ID } from './constants';
import Container from './Container';
import PostLikesModal from './PostLikesModal';
import ReportModal from './ReportModal';
import Opener from './Opener';

register(MODAL_ID, {
  type: 'modal',
  component: Container,
  className: 'post-modal',
  showCloseBtn: true,
});

register('report-post', {
  type: 'modal',
  component: ReportModal,
});

register('post-likes', {
  type: 'modal',
  component: PostLikesModal,
  className: 'modal-likes-list',
});

export {
  Opener,
  reducer,
  actions,
  selectors,
};
