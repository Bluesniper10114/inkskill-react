import React from 'react';
import Link from 'core/components/Link';
import logoW from 'assets/img/logo-w.png';

const WhiteLogo = () => (
  <Link to="/" className="img-box">
    <img src={logoW} alt="InkSkill" />
  </Link>
);

export default WhiteLogo;
