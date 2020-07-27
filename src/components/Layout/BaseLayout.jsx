/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';

import GlobalStyle from '../GlobalStyle';
import Header from './Header';
import Footer from './Footer';
import Hero from '../Hero';

const rootStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  variant: 'layout.root',
};

const mainStyle = {
  width: '100%',
  flex: '1 1 auto',
  variant: 'layout.main',
};

const BaseLayout = ({ title, subtitle, img, alt, imgTitle, hero, children }) => (
  <React.Fragment>
    <GlobalStyle />
    <div sx={rootStyle}>
      <Header />
      <main sx={mainStyle}>
        {hero || <Hero title={title} subtitle={subtitle} img={img} alt={alt} imgTitle={imgTitle} />}
        {children}
      </main>
      <Footer />
    </div>
  </React.Fragment>
);

export default BaseLayout;
