import switcher from 'core/utils/switcher';
import General from './GeneralContainer';
import Bio from './BioContainer';
import Images from './Images';
import Videos from './Videos';
import QA from './QA';
import Shop from './Shop';

export default switcher(props => props.step, {
  general: General,
  bio: Bio,
  images: Images,
  videos: Videos,
  qa: QA,
  shop: Shop,
});
