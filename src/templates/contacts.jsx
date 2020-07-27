/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';

import Layout from '../components/Layout';
import Contacts from '../components/pages/contacts';

const mapSrc =
  'https://maps.google.com/maps?q=Tarutynsʹkyy+Step&t=&z=13&ie=UTF8&iwloc=&output=embed';

const GoogleMap = () => (
  <iframe
    title="Google Map"
    width="100%"
    height="450px"
    frameBorder={0}
    scrolling="no"
    marginHeight={0}
    marginWidth={0}
    src={mapSrc}
  />
);

const ContactsTemplate = ({ path, data, pageContext: { locale } }) => {
  const { html, title, metaTitle, /* description, */ metaDescription } = data.page;

  return (
    <Layout hero={<GoogleMap />}>
      <SEO
        locale={locale}
        title={metaTitle || title}
        description={metaDescription}
        pathname={path}
      />
      {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
      <Contacts />
    </Layout>
  );
};

export default ContactsTemplate;

export const pageQuery = graphql`
  query ContactsPageQuery($id: String!) {
    page: mdPage(id: { eq: $id }) {
      ...DefaultMdFragment
    }
  }
`;
