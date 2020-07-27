import React from 'react';

const LocaleContext = React.createContext();

export default function I18nProvider({ value, children }) {
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return React.useContext(LocaleContext);
}
