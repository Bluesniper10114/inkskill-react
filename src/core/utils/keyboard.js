import { Component } from 'react';
import createFactory from './createFactory';
import createRecomposeHelper from "./createRecomposeHelper";

export const ESCAPE = 27;
export const ENTER = 13;
export const ARROWS = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
};

const withKeyboard = handler => (BaseComponent) => {
  const factory = createFactory(BaseComponent);

  return class extends Component {
    componentDidMount() {
      window.addEventListener('keydown', this.listener);
    }

    componentWillUnmount() {
      window.removeEventListener('keydown', this.listener);
    }

    listener = (event) => {
      handler(event.keyCode, this.props);
    };

    render() {
      return factory({ ...this.props });
    }
  };
};

export default createRecomposeHelper(withKeyboard, 'withKeyboard');
