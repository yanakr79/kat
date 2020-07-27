import React from 'react';

import { useLocale } from '../../../../i18n/i18n-context';
import i18n, { useTranslation } from '../../../../i18n';

const LegalInfo = () => {
  const { locale } = useLocale();
  const { t } = useTranslation();

  const { legalName } = i18n.locales[locale];

  return <div>{`© ${new Date().getFullYear()} «${legalName}». ${t('all_rights_reserved')}`}</div>;
};

export default LegalInfo;
