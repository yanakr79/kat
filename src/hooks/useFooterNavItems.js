import { useLocale } from '../i18n/i18n-context';

const useFooterNavItems = () => useLocale().links.footerNavItems;

export default useFooterNavItems;
