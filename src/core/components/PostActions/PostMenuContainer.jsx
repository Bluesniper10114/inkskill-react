import { connect } from 'react-redux';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import withHandlers from 'recompose/withHandlers';
import { actions } from 'core/modules/post-overlay';
import { withModal } from 'core/modules/modal';
import { withRotate, download } from 'core/utils/posts';
import { withAuth } from 'core/utils/auth';
import { withCrop } from 'core/components/ImageInput';
import PostMenu from './PostMenu';

const MENU_ITEMS = [
  { id: 'download', label: 'Download' },
  { id: 'report', label: 'Report Photo' },
  '---',
  { id: 'fullscreen', label: 'Enter Fullscreen' },
];

const OWNER_PHOTO_MENU = [
  { id: 'make_avatar', label: 'Make Profile Picture' },
  { id: 'rotate_left', label: 'Rotate Left' },
  { id: 'rotate_right', label: 'Rotate Right' },
  '---',
];

const getMenuItems = (post, isOwner) => {
  if (!isOwner || post.type !== 'photo') return MENU_ITEMS;

  const menu = [...MENU_ITEMS];
  menu.splice(3, 0, ...OWNER_PHOTO_MENU);
  return menu;
};

export default compose(
  connect(null, actions),
  withAuth,
  withRotate,
  withModal('report-post', 'onReport'),
  withCrop({
    minWidth: 256,
    minHeight: 256,
    modalId: 'upload_avatar',
  }),
  withHandlers({
    onMakeAvatar: ({ post, onSelect }) => () => onSelect(post.url),
    isOwner: ({ post, auth }) => () => auth.username === post.user.username,
  }),
  withProps(({ post, isOwner }) => ({
    items: getMenuItems(post, isOwner()),
  })),
  withHandlers({
    onMenuSelect: ({ post, onMakeAvatar, setFullScreen, onReport, onRotate }) => (action) => {
      switch (action) {
        case 'make_avatar':
          onMakeAvatar();
          break;
        case 'fullscreen':
          setFullScreen(true);
          break;
        case 'download':
          download(post);
          break;
        case 'report':
          onReport({ post });
          break;
        case 'rotate_left':
        case 'rotate_right':
          onRotate(action.replace('rotate_', ''));
          break;
        default:
          console.log(action);
          break;
      }
    },
  }),
)(PostMenu);
