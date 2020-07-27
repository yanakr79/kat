import React from 'react';
import styled from '@emotion/styled';

import { useTranslation } from '../../../i18n';

import ContactForm from './ContactForm';

import { useLocale } from '../../../i18n/i18n-context';
import OrganizationPostalAddress from '../../organization/OrganizationPostalAddress';
import OrganizationPhones from '../../organization/OrganizationPhones';
import OrganizationEmail from '../../organization/OrganizationEmail';
import OrganizationSite from '../../organization/OrganizationSite';
import OrganizationCloudPhones from '../../organization/OrganizationCloudPhones';
import OrganizationOpeningHours from '../../organization/OrganizationOpeningHours';

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 1rem;
`;

const CardHeading = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

const Wrapper = styled.div`
  width: 100%;
  padding: 0 1rem 2rem 1rem;
`;

const CardWrapper = styled(Wrapper)`
  line-height: 1.75;

  a:hover {
    color: ${(p) => p.theme.colors.highlight};
  }

  ${(p) => p.theme.mediaQueries.lg} {
    width: auto;
  }
`;

const Card = ({ title, children }) => (
  <CardWrapper>
    <CardHeading>{title}</CardHeading>
    {children}
  </CardWrapper>
);

const ContactFormWrapper = styled.div`
  width: 100%;
  margin: 1.25rem 0;
  padding: 2rem;
  border-top: 8px solid transparent;
  box-shadow: 0 5px 13px rgba(0, 0, 0, 0.17);
  border-image: 16
    repeating-linear-gradient(
      -45deg,
      red,
      red 1rem,
      transparent 0,
      transparent 2rem,
      #58a 0,
      #58a 3rem,
      transparent 0,
      transparent 4rem
    );
`;

const Contact = () => {
  const { t } = useTranslation();
  const {
    organization: { email, voice, openingHours },
  } = useLocale();

  return (
    <>
      <CardsWrapper>
        <Card title={t('contacts.wait_you_on_address')}>
          <OrganizationPostalAddress />
        </Card>

        {openingHours && (
          <Card title={t('contacts.opening_time')}>
            <OrganizationOpeningHours openingHours={openingHours} />
          </Card>
        )}

        <Card title={t('contacts.call_us')}>
          <OrganizationPhones phones={voice.phone} />
          <OrganizationEmail email={email} />
          <OrganizationSite />
        </Card>

        <Card title=" ">
          <OrganizationCloudPhones voice={voice} />
        </Card>
      </CardsWrapper>

      <Wrapper>
        <CardHeading>{t('contacts.write_us')}</CardHeading>
        <ContactFormWrapper>
          <ContactForm />
        </ContactFormWrapper>
      </Wrapper>
    </>
  );
};

export default Contact;
