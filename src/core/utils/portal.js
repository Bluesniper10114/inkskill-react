import React from 'react';
import { render } from 'react-dom';

class Portal extends React.PureComponent {
  componentDidMount() {
    const { id } = this.props;

    let element = id && document.getElementById(id);
    if (!element) {
      element = document.createElement('div');
      if (id) element.id = this.props.id;
      document.body.appendChild(element);
    }
    this.portalElement = element;
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    render(<div {...this.props}>{this.props.children}</div>, this.portalElement);
  }

  componentWillUnmount() {
    document.body.removeChild(this.portalElement);
  }

  portalElement = null;

  render() {
    return null;
  }
}

export default Portal;
