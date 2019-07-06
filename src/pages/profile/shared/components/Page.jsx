import React from 'react';
import Spacer from 'core/components/Spacer';
import Header from './Header';
import Content from './Content';
import Navigation from './NavigationContainer';

const Profile = ({ children, append, ...props }) => (
  <div>
    <Header {...props} />
    <Spacer />
    <Spacer type="tall" />
    <div className="container">
      <div className="col-lg-3">
        <Content />
      </div>
      <div className="col-lg-9">
        <Navigation />
        {children}
      </div>
    </div>
    {append}
  </div>
);

export default Profile;
