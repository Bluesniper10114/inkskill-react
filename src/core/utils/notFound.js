import React from 'react';
import branch from 'recompose/branch';
import NotFound from 'core/components/NotFound';

const defaultTest = ({ notFound, deleted }) => notFound || deleted;

export default (message, test = defaultTest) => branch(
  test,
  () => () => <NotFound message={message} />
);
