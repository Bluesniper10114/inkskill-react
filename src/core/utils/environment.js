/* eslint-disable class-methods-use-this */

import { Component } from 'react';
import throttle from 'lodash/throttle';
import createFactory from './createFactory';

let environment;
const BREAK_POINTS = {
  tablet: 991,
  mobile: 767,
};

const getEnvironment = throttle(() => {
  const width = window.innerWidth;
  environment = Object.keys(BREAK_POINTS).reduce((result, env) =>
    (width <= BREAK_POINTS[env] ? env : result), 'desktop');
}, 100);

getEnvironment();

const withEnvironment = (BaseComponent) => {
  const factory = createFactory(BaseComponent);

  return class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        environment: getEnvironment(),
      };
    }

    componentDidMount() {
      window.addEventListener('resize', this.listener);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.listener);
    }

    listener = () => {
      getEnvironment();

      if (environment !== this.state.environment) {
        this.setState({ environment });
      }
    };

    render() {
      return factory({ ...this.props, environment });
    }
  };
};

export default withEnvironment;
