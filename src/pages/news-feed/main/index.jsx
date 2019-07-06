import React from 'react';
import Page from 'core/components/PublicPage';
import Spacer from 'core/components/Spacer';
import Title from 'core/components/Title';
import Ads from 'core/components/Ads';
import Content from './Content';

import adsH from 'assets/img/ads-h-1.png';


const Index = () => (
  <Page>
    <Spacer type="tall" />
    <Ads href="#" image={adsH} />
    <Spacer type="tall" />
    <Title>NEWS FEED</Title>
    <Content />
  </Page>
);

export default Index;
