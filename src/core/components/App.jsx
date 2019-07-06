import React from 'react';
import { SITE_URL } from 'core/config/env';
import Header from './Header/index';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import ModalContainer from '../modules/modal/Container';

const App = ({ children }) => (
  <div>
    <Header />
    <div className="app-content">{children}</div>
    { SITE_URL !== 'http://www.inkskill.com' && (
      <Footer />
    )}
    <ModalContainer />
    <ScrollToTop />
  </div>
);

export default App;
