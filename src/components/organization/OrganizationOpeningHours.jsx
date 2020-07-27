/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';

import { useTranslation } from '../../i18n';

const wrapStyle = {
  display: 'grid',
  gridTemplateColumns: '2rem 3rem 1rem 3rem',
  rowGap: '0.1rem',
  columnGap: '0.1rem',
};
const dowStyle = {
  ':after': {
    content: '":"',
  },
};
const OrganizationOpeningHours = ({ openingHours }) => {
  const { t } = useTranslation();

  return (
    <div sx={wrapStyle}>
      {openingHours.map(([dow, timeStart, timeFinish]) => (
        <React.Fragment key={dow}>
          <div sx={dowStyle}>{t(`dow.d2.${dow}`)}</div>
          <div>{timeStart}</div>
          <div>-</div>
          <div>{timeFinish}</div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default OrganizationOpeningHours;
