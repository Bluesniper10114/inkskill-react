import switcher from 'core/utils/switcher';
import LikeIcon from 'assets/svg/like-icon.svg';
import Emoticon1 from 'assets/svg/emoticon-1.svg';
import Emoticon2 from 'assets/svg/emoticon-2.svg';
import Emoticon3 from 'assets/svg/emoticon-3.svg';
import Emoticon4 from 'assets/svg/emoticon-4.svg';
import Emoticon5 from 'assets/svg/emoticon-5.svg';

export default switcher(({ type }) => type, {
  default: LikeIcon,
  2: Emoticon1,
  3: Emoticon2,
  4: Emoticon3,
  5: Emoticon4,
  6: Emoticon5,
});
