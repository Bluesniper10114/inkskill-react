import { compose, withState, withHandlers } from 'recompose';
import { trackBodyClicks } from '../../utils/dom';
import Dropdown from './Dropdown';

const enhancer = compose(
  withState('open', 'toggle', false),
  withHandlers({
    onToggle: ({ toggle }) => (flag) => {
      if (flag) {
        trackBodyClicks('dropdown-menu', () => {
          toggle(false);
        });
      }

      toggle(flag);
    },
  }),
);

export default enhancer(Dropdown);
