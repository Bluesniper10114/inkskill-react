import React from 'react';
import Page from 'core/components/PublicPage';
import Spacer from 'core/components/Spacer';
import HeroTitle from 'core/components/HeroTitle';
import ContactForm from './ContactForm';

const Index = () => (
  <Page>
    <HeroTitle className="contact-us">CONTACT US</HeroTitle>
    <Spacer type="tall" />
    <ContactForm />
    <Spacer type="tall" />
  </Page>
);

export default Index;
