/** @jsx jsx */
import { jsx } from 'theme-ui';

import mq from '../../../gatsby-plugin-theme-ui/media-queries';
import { useTranslation } from '../../../i18n';
import Button from '../../Button';

const style = {
  height: '3rem',
  fontWeight: 'body',
  fontSize: 1,
  letterSpacing: '1px',
  m: '2rem auto 0',
  [mq.lg]: {
    height: '2rem',
    my: 'auto',
  },
};

const CTAButton = ({ onClick }) => {
  const { t } = useTranslation();
  return (
    <Button tag="link" overrideCSS={style} to="/support-us" onClick={onClick}>
      {t('nav.support_us')}
    </Button>
  );
};

export default CTAButton;
