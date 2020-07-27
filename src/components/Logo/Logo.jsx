/** @jsx jsx */
import { jsx } from 'theme-ui';

import Link from '../LocalizedLink';
import { useLocale } from '../../i18n/i18n-context';
import i18n from '../../i18n';

//  sx={{ height: '2.2rem' }}
const Logo = ({ onClick }) => {
  const { locale } = useLocale();
  return (
    <Link sx={{ mr: '3rem', display: 'flex', alignItems: 'center' }} to="/" onClick={onClick}>
      <img src="/assets/logo.svg" alt={i18n.locales[locale].siteShortName} height="35" width="62" />
    </Link>
  );
};

export default Logo;
