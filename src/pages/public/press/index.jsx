import React from 'react';
import Spacer from 'core/components/Spacer';
import Page from 'core/components/PublicPage';
import HeroTitle from 'core/components/HeroTitle';
import Content from './Content';

const Index = () => (
  <Page>
    <HeroTitle className="press">PRESS.</HeroTitle>
    <Spacer type="tall" />
    <Content />
    <Spacer type="tall" />
  </Page>
);

export default Index;
