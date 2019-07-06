import React from 'react';
import Spacer from 'core/components/Spacer';
import HeroTitle from 'core/components/HeroTitle';
import Content from './Content';

const Index = () => (
  <div>
    <HeroTitle className="privacy-policy">PRIVACY POLICY.</HeroTitle>
    <Spacer type="tall" />
    <Content />
    <Spacer type="tall" />
  </div>
);

export default Index;
