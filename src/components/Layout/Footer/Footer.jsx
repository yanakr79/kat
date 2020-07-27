/** @jsx jsx */
import { jsx } from 'theme-ui';
/*
    "react-loadable": "^5.5.0",
    "react-loadable-visibility": "^3.0.2",
import LoadableVisibility from 'react-loadable-visibility/react-loadable';

import Spinner from '../../Spinner';

const FooterInner = LoadableVisibility({
  loader: () => import('./FooterInner'),
  loading: Spinner,
});
*/
import FooterInner from './FooterInner';

const Footer = () => {
  return (
    <footer sx={{ variant: 'layout.footer' }}>
      <FooterInner />
    </footer>
  );
};

export default Footer;
