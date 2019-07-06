/* eslint-disable class-methods-use-this */

import { PureComponent } from 'react';
import createFactory from './createFactory';
import createRecomposeHelper from "./createRecomposeHelper";

const withScroll = handler => (BaseComponent) => {
  const factory = createFactory(BaseComponent);

  return class extends PureComponent {
    get top() {
      return document.body.scrollTop;
    }
    get bottom() {
      return document.body.scrollHeight - document.body.scrollTop - window.innerHeight;
    }

    componentDidMount() {
      window.addEventListener('scroll', this.listener);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.listener);
    }

    listener = () => {
      handler(this, this.props);
    };

    render() {
      return factory({ ...this.props });
    }
  };
};

export default createRecomposeHelper(withScroll, 'withScroll');
