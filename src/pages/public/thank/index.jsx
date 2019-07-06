import React from 'react';
import Page from 'core/components/PublicPage';
import Spacer from 'core/components/Spacer';
import HeroTitle from 'core/components/HeroTitle';

const Index = () => (
  <Page showCreate={false}>
    <HeroTitle className="sign-up">Thank you</HeroTitle>
    <Spacer type="tall" />
    <div className="container">
      <div className="signup-box thankyou-box">
        <div className="row text-center">
          <p>Thank you for signing up. We are working to launch our services such as enhanced
            profile and newsfeed, and other social aspects. We will notifiy you when these services
          are live.</p>
        </div>
      </div>
    </div>
    <Spacer />
    <Spacer type="tall" />
  </Page>
);

export default Index;
