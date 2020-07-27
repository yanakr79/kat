/* eslint-disable react/no-array-index-key */
/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';

import { useLocale } from '../../i18n/i18n-context';

const OrganizationPostalAddress = () => {
  const { address } = useLocale();

  const { legalName, postalAddress } = address;
  const { streetAddress, addressLocality, postalCode, addressCountry } = postalAddress;

  // sx={{ fontWeight: 'semibold' }}
  return (
    <React.Fragment>
      <div>{legalName}</div>
      {streetAddress.map((item, i) => (
        <div key={i}>{item}</div>
      ))}
      <div>{`${postalCode}  ${addressLocality}`}</div>
      <div>{addressCountry}</div>
    </React.Fragment>
  );
};

export default OrganizationPostalAddress;
