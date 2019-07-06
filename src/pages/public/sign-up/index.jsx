import React from 'react';
import { Link } from 'core/components';
import Page from 'core/components/PublicPage';
import Spacer from 'core/components/Spacer';
import HeroTitle from 'core/components/HeroTitle';
import SignUpForm from './SignUpContainer';

const Index = () => (
  <Page showCreate={false}>
    <HeroTitle className="sign-up">SIGN UP</HeroTitle>
    <Spacer type="tall" />
    <SignUpForm />
    <Spacer />
    <div className="container text-center">
      Already have an account? {' '}
      <Link to="/login">Login</Link>
    </div>
    <Spacer type="tall" />
  </Page>
);

export default Index;
