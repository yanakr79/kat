/* eslint-disable react/no-array-index-key */
import React from 'react';

import Utils from '../../lib/utils';
import IconLink from '../IconLink';
import extraPadding from './extraPadding';

const OrganizationPhones = ({ phones }) => {
  return (
    <>
      {phones.map((phone, i) => (
        // TODO: \AT_Lib\trackCallLink($title)
        <IconLink
          key={i}
          icon={i === 0 ? 'phone' : ''}
          to={Utils.phoneUrl(phone)}
          extraStyle={extraPadding}
        >
          {Utils.formatPhone(phone)}
        </IconLink>
      ))}
    </>
  );
};

export default OrganizationPhones;
