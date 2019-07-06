/* eslint-disable react/no-unescaped-entities */

import React from 'react';
import { Link } from 'core/components';
import Page from 'core/components/PublicPage';
import Spacer from 'core/components/Spacer';
import HeroTitle from 'core/components/HeroTitle';
import LoginForm from './LoginFormContainer';

const Index = () => (
  <Page showCreate={false}>
    <HeroTitle className="sign-up">LOGIN</HeroTitle>
    <Spacer type="tall" />
    <LoginForm />
    <Spacer />
    <div className="container text-center">
      Don't have an account? {' '}
      <Link to="/sign-up">Sign Up</Link>
    </div>
    <Spacer />
    <div className="container text-center">
      <Link to="/forgot-password">Forgot Password</Link>
    </div>
    <Spacer type="tall" />
  </Page>
);

export default Index;
