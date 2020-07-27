import { useLocale } from '../i18n/i18n-context';

const useMainNavtems = () => useLocale().links.mainNavItems;

export default useMainNavtems;
