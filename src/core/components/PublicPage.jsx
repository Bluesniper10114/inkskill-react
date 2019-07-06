import React from 'react';
import Spacer from './Spacer';
import CreateAccount from '../components/CreateAccount';

const PublicPage = ({ children, paddingBottom = true, showCreate = true }) => (
  <div>
    {children}
    {paddingBottom && <Spacer />}
    {paddingBottom && <Spacer type="giant" />}
    {showCreate && <CreateAccount />}
  </div>
);

export default PublicPage;
