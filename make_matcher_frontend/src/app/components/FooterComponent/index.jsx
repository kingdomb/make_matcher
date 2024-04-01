import React from 'react';
import footerLogo from '../../../images/makematcher-black-transparent-160x17.png';
import './Footer.scss';

export function FooterComponent() {
  function getFullYear() {
    return new Date().getFullYear();
  }

  return (
    <div className="footer-wrapper">
      <img src={footerLogo} alt="makematcher black logo" />
      &nbsp; &copy;
      {getFullYear()}
    </div>
  );
}
