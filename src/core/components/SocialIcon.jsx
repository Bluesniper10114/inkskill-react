import TwIcon from 'assets/svg/tw-icon.svg';
import FbIcon from 'assets/svg/fb-icon.svg';
import GpIcon from 'assets/svg/gp-icon.svg';
import IgIcon from 'assets/svg/ig-icon.svg';
import LinkIcon from 'assets/svg/link-icon.svg';
import switcher from '../utils/switcher';

export default switcher(
  ({ type }) => type,
  {
    tw: TwIcon,
    fb: FbIcon,
    gp: GpIcon,
    ig: IgIcon,
    default: LinkIcon,
  },
);
