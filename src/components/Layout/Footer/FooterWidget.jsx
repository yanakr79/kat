/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';

const headingStyle = { mb: '0.3rem' };

const FooterWidget = ({ title, children }) => (
  <React.Fragment>
    <h3 sx={headingStyle}>{title}</h3>
    {children}
  </React.Fragment>
);

export default FooterWidget;
