import compose from 'recompose/compose';
import withLoading from 'core/utils/loading';
import notFound from 'core/utils/notFound';
import { register } from 'core/utils/modalsRegistry';
import { withProfile } from '../utils';
import Page from './Page';
import AddImage from './Modals/AddImageContainer';
import AddVideo from './Modals/AddVideoContainer';
import Followers from './Modals/FollowersContainer';
import UploadAvatar from './Modals/UploadAvatar';
import UploadPicHero from './Modals/UploadPicHero';
import FacebookImport from './Modals/FacebookImport';
import InstagramImport from './Modals/InstagramImport';
import YoutubeImport from './Modals/YoutubeImport';
import Confirm from './Modals/Confirm';
import Subscribe from './Modals/Subscribe';
import EnterWebUrl from './Modals/EnterWebUrl';

register('upload_avatar', { type: 'modal', component: UploadAvatar });
register('upload_pichero', { type: 'modal', component: UploadPicHero });
register('facebook_import', { type: 'modal', component: FacebookImport });
register('instagram_import', { type: 'modal', component: InstagramImport });
register('youtube_import', { type: 'modal', component: YoutubeImport });

register('add_image', { type: 'modal', component: AddImage, className: 'modal-add-post' });
register('add_video', { type: 'modal', component: AddVideo, className: 'modal-add-post' });
register('followers', { type: 'modal', component: Followers, className: 'modal-follow-list' });
register('following', { type: 'modal', component: Followers, className: 'modal-follow-list' });

register('confirm', { type: 'modal', component: Confirm });
register('subscribe', { type: 'modal', component: Subscribe });
register('enter_web_url', { type: 'modal', component: EnterWebUrl });

const PageContainer = compose(
  withProfile(),
  withLoading(),
  notFound('Profile not found')
)(Page);

export default PageContainer;
