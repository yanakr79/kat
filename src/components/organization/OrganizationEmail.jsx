/* eslint-disable react/no-array-index-key */
import React from 'react';

import IconLink from '../IconLink';
import extraPadding from './extraPadding';

const OrganizationEmail = ({ email }) => {
  return (
    <>
      {email.map((item, i) => (
        <IconLink
          key={i}
          obfuscate
          icon="envelope"
          extraStyle={extraPadding}
          to={`mailto:${item}`}
        />
      ))}
    </>
  );
};

export default OrganizationEmail;
