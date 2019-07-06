import React, { Component } from 'react';
import screenfull from 'screenfull';
import branch from 'recompose/branch';
import renderNothing from 'recompose/renderNothing';

const event = screenfull && screenfull.raw.fullscreenchange;

const fullScreen = BaseComponent => class extends Component {
  componentDidMount() {
    screenfull.request(this.root);
    document.addEventListener(event, this.listener);
  }

  componentWillUnmount() {
    screenfull.exit();
    document.removeEventListener(event, this.listener);
  }

  listener = () => {
    const { onExit } = this.props;
    if (!screenfull.isFullscreen && onExit) onExit();
  };

  render() {
    return (
      <div ref={(ref) => { this.root = ref; }}>
        <BaseComponent {...this.props} />
      </div>
    );
  }
};

export default branch(
  () => !screenfull.enabled || !event,
  renderNothing,
)(fullScreen);
