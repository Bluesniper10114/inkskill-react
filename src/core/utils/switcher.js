// @flow

import React from 'react';

type PropFn = (Object) => string;
type ComponentsMap = {
  [key: string]: any
};

const switcher = (prop: PropFn, map: ComponentsMap) => (props: Object) => {
  const propVal = prop(props);
  const Component = map[propVal] || map.default;

  if (propVal && !Component) {
    console.warn(`There is no component with '${propVal}' ID`); // eslint-disable-line
  }

  if (!Component) return null;

  return <Component {...props} />;
};


export default switcher;
