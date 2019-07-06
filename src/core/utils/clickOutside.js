import React, { Component } from 'react';
import uniqueId from 'lodash/uniqueId';

function findClosest(element, fn) {
  if (!element) return undefined;
  return fn(element) ? element : findClosest(element.parentElement, fn);
}

const clickOutside = options => (BaseComponent) => {
  let handler;
  let trackOnMount = true;

  if (typeof options === 'function') {
    handler = options;
  } else {
    handler = options.handler;
    trackOnMount = options.trackOnMount;
  }

  return class extends Component {
    constructor(props) {
      super(props);
      this.id = uniqueId('util_outside-');
    }

    componentDidMount() {
      if (trackOnMount) this.addListener();
    }

    componentWillUnmount() {
      this.removeListener();
    }

    addListener() {
      document.addEventListener('click', this.listener);
    }

    removeListener() {
      document.removeEventListener('click', this.listener);
    }

    listener = (event) => {
      const target = findClosest(event.target, el => el.id === this.id);
      if (!target) {
        handler(this.props);
      }
    };

    setTracking = (flag) => {
      if (flag) {
        this.addListener();
      } else {
        this.removeListener();
      }
    };

    render() {
      return (
        <div id={this.id}>
          <BaseComponent {...this.props} setTracking={this.setTracking} />
        </div>
      );
    }
  };
};

export default clickOutside;
