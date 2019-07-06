import { createSelector } from 'reselect';
import { getImageUrl } from 'core/utils/images';
import { selectors as auth } from 'core/state/auth';

export const getOverlayData = state => state.postOverlay;
export const getPost = createSelector(
  getOverlayData,
  overlay => overlay.post,
);

export const getCommentForm = createSelector(
  getPost,
  post => ({ focusComment: post.focusComment }),
);

export const getComments = createSelector(
  auth.getCurrentUserId,
  getOverlayData,
  (currentUserId, overlay) => overlay.comments.map(comment => ({
    ...comment,
    isMine: comment.user.id === currentUserId,
  })),
);

export const getRightSide = createSelector(
  getComments,
  getPost,
  (comments, image) => ({
    comments,
    pictureUrl: getImageUrl(image),
  })
);
