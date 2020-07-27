/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import I18nProvider from './src/i18n/i18n-context';

export const wrapPageElement = ({ element, props: { pageContext } }) => {
  const { locale, translations, address, links, organization } = pageContext;
  return (
    <I18nProvider value={{ locale, translations, address, links, organization }}>
      {element}
    </I18nProvider>
  );
};
