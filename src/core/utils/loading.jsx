// @flow

import React from 'react';
import branch from 'recompose/branch';
import renderComponent from 'recompose/renderComponent';
import Portal from './portal';

export const Spinner = () => (
  <div className="loading-spiner">
    <div id="loader_img1" className="inkskill_loader" />
    <div id="loader_img2" className="inkskill_loader" />
    <div id="loader_img3" className="inkskill_loader" />
    <div id="loader_img4" className="inkskill_loader" />
    <div id="loader_img5" className="inkskill_loader" />
  </div>
);

export const Loader = () => (
  <Portal className="loading-spiner-holder">
    <Spinner />
  </Portal>
);

const defaultTest = ({ loading }) => loading;

interface TestFn<T> {
  $call(props: T): boolean
}

interface PreloadFn<T> {
  $call(test: TestFn<T>): any
}

const preload: PreloadFn<mixed> = (test = defaultTest) => branch(
  test,
  renderComponent(Loader)
);

export default preload;
