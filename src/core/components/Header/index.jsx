import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import withProps from 'recompose/withProps';
import lifecycle from 'recompose/lifecycle';
import pure from 'recompose/pure';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import { withRouter } from 'react-router';
import { withSearchOverlay } from 'core/modules/search';
import withScroll from 'core/utils/scroll';
import Header from './Header';


export default compose(
  pure,
  withRouter,
  withSearchOverlay,
  withState('open', 'setOpen', false),
  withState('prevTop', 'setPrevTop', 0),
  withState('hidden', 'setHidden', false),
  withHandlers({
    onToggle: ({ open, setOpen }) => () => setOpen(!open),
  }),
  withProps(({ location }) => ({
    showSearch: location.pathname !== '/',
  })),
  withScroll(({ top }, { setHidden, setPrevTop, prevTop }) => {
    setHidden(top >= 120 && prevTop < top);
    setPrevTop(top);
  }),
  lifecycle({
    componentWillReceiveProps({ location }) {
      const prevLocation = this.props.location;

      if (prevLocation.pathname !== location.pathname) {
        this.props.setOpen(false);
      }
    },
  }),
  onlyUpdateForKeys(['open', 'hidden', 'showSearch']),
)(Header);
