/* eslint-disable react/no-unescaped-entities */

import React from 'react';
import { Link } from 'core/components';
import Page from 'core/components/PublicPage';
import Spacer from 'core/components/Spacer';
import HeroTitle from 'core/components/HeroTitle';
import ForgotForm from './ForgotFormContainer';

const Index = () => (
  <Page showCreate={false}>
    <HeroTitle className="sign-up">FORGOT PASSWORD</HeroTitle>
    <Spacer type="tall" />
    <ForgotForm />
    <Spacer />
    <div className="container text-center">
      <Link to="/login">Login</Link>
    </div>
    <Spacer />
    <Spacer type="tall" />
  </Page>
);

export default Index;
