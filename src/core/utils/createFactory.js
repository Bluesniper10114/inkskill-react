import React from 'react';

const isClassComponent = Component => Boolean(
  Component &&
  Component.prototype &&
  typeof Component.prototype.isReactComponent === 'object'
);

const isReferentiallyTransparentFunctionComponent = Component => Boolean(
  typeof Component === 'function' &&
  !isClassComponent(Component) &&
  !Component.defaultProps &&
  !Component.contextTypes &&
  (process.env.NODE_ENV === 'production' || !Component.propTypes)
);

const createEagerElementUtil = (
  hasKey,
  isReferentiallyTransparent,
  type,
  props,
  children
) => {
  if (!hasKey && isReferentiallyTransparent) {
    if (children) {
      return type({ ...props, children });
    }
    return type(props);
  }

  const Component = type;

  if (children) {
    return <Component {...props}>{children}</Component>;
  }

  return <Component {...props} />;
};

const createFactory = (type) => {
  const isReferentiallyTransparent = isReferentiallyTransparentFunctionComponent(type);
  return (p, c) => createEagerElementUtil(false, isReferentiallyTransparent, type, p, c);
};

export default createFactory;
