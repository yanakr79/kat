/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';

import Container from '../../Container';
import FooterWidget from './FooterWidget';
import SocialLinks from './SocialLinks';
import FooterNavigation from './FooterNavigation';
import LegalInfo from './LegalInfo';

import { useTranslation } from '../../../i18n';
import { useLocale } from '../../../i18n/i18n-context';

import OrganizationPostalAddress from '../../organization/OrganizationPostalAddress';
import OrganizationEmail from '../../organization/OrganizationEmail';
import OrganizationSite from '../../organization/OrganizationSite';
import OrganizationPhones from '../../organization/OrganizationPhones';
import OrganizationCloudPhones from '../../organization/OrganizationCloudPhones';

const styleWidgetArea = {
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  justifyContent: 'space-around',
  py: [4, 4, 6],
  a: {
    ':hover': {
      color: 'footer.highlight',
    },
  },
};

const WidgetWrapper = ({ extraStyle, children }) => (
  <div
    sx={{
      ...extraStyle,
      mb: ['1rem', '1.5rem', '1rem', 0],
      lineHeight: 1.75,
    }}
  >
    {children}
  </div>
);

const styleWidgetGreeting = {
  width: ['100%', '100%', '100%', '50%'],
  pr: [0, 0, 0, 6],
};
const styleGreetingImg = { float: 'left', mt: 3 };
const styleGreetingText = { textAlign: 'justify' };

const styleWidgetAddr1 = {
  width: ['100%', 'auto', 'auto', 'auto'],
};
const styleWidgetAddr2 = {
  width: ['100%', 'auto', 'auto', 'auto'],
};

const styleColophonTop = {
  variant: 'layout.footer.colophon.top',
};
const styleColophonBottom = {
  variant: 'layout.footer.colophon.bottom',
};

const FooterInner = () => {
  const { t } = useTranslation();
  const {
    organization: { email, voice },
  } = useLocale();
  return (
    <React.Fragment>
      <Container sx={styleWidgetArea}>
        <WidgetWrapper extraStyle={styleWidgetGreeting}>
          <h3>{t('footer.greeting.title')}</h3>
          <img
            sx={styleGreetingImg}
            src="/assets/logo-danube-delta.svg"
            alt="Danube Delta Rewilding Europe Logo"
            height="121"
            width="100"
          />
          <div sx={styleGreetingText}>{t('footer.greeting.text')}</div>
        </WidgetWrapper>

        <WidgetWrapper extraStyle={styleWidgetAddr1}>
          <FooterWidget title={t('footer.our_address')}>
            <OrganizationPostalAddress />
            <OrganizationEmail email={email} />
            <OrganizationSite />
          </FooterWidget>
        </WidgetWrapper>

        <WidgetWrapper extraStyle={styleWidgetAddr2}>
          <FooterWidget title={t('footer.call_us')}>
            <OrganizationPhones phones={voice.phone} />
            <OrganizationCloudPhones voice={voice} />
          </FooterWidget>
        </WidgetWrapper>
      </Container>

      <div sx={styleColophonTop}>
        <Container>
          <SocialLinks />
          <FooterNavigation />
        </Container>
      </div>
      <div sx={styleColophonBottom}>
        <Container>
          <LegalInfo />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default FooterInner;
