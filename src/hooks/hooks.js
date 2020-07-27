import { useEffect } from 'react';
// https://github.com/huchenme/hacker-tab-extension/blob/master/src/helpers/github.js
import useLocalStorage from './useLocalStorage';
import {
  KEY_SCHEMA_VERSION,
  KEY_DARK_MODE,
  KEY_COOKIE_WARNED,
  CURRENT_SCHEMA_VERSION,
} from '../helpers/localStorage';

export const useDarkMode = () => {
  const preferDarkQuery = '(prefers-color-scheme: dark)';
  const [mode, setMode] = useLocalStorage(
    KEY_DARK_MODE,
    Boolean(window.matchMedia(preferDarkQuery).matches),
  );
  useEffect(() => {
    const mediaQuery = window.matchMedia(preferDarkQuery);
    const handleChange = () => setMode(Boolean(mediaQuery.matches));
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, [setMode]);

  return [mode, setMode];
};

export const useCookieWarned = () => useLocalStorage(KEY_COOKIE_WARNED, false);

export const useCheckLocalStorageSchema = () => {
  const [schemaVersion, setSchemaVersion] = useLocalStorage(KEY_SCHEMA_VERSION);
  if (schemaVersion !== CURRENT_SCHEMA_VERSION) {
    window.localStorage.clear();
    setSchemaVersion(CURRENT_SCHEMA_VERSION);
  }
};
