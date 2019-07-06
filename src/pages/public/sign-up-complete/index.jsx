import React from 'react';
import Page from 'core/components/PublicPage';
import Wizard from './WizardContainer';

const Index = () => (
  <Page showCreate={false}>
    <Wizard />
  </Page>
);

export default Index;
