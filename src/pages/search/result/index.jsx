import React from 'react';
import Page from 'core/components/PublicPage';
import Spacer from 'core/components/Spacer';
import HeroTitle from 'core/components/HeroTitle';

import Header from './Header';
import Content from './Content';

const Index = () => (
  <Page>
    <HeroTitle className="search-result">SEARCH RESULT</HeroTitle>
    <Header term="test" />
    <Spacer type="tall" />
    <Content />
  </Page>
);

export default Index;
