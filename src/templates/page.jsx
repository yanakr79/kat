/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';

import useBanner from '../hooks/useBanner';
import Layout from '../components/Layout';

const PageTemplate = ({ path, data, pageContext: { locale } }) => {
  const { html, title, metaTitle, description, metaDescription, cover, noindex } = data.page;

  const { img, alt, imgTitle } = useBanner(cover);

  return (
    <Layout title={title} subtitle={description} img={img} alt={alt} imgTitle={imgTitle}>
      <SEO
        locale={locale}
        title={metaTitle}
        description={metaDescription}
        pathname={path}
        noindex={noindex}
      />
      {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
    </Layout>
  );
};

export default PageTemplate;

export const pageQuery = graphql`
  query PageQuery($id: String!) {
    page: mdPage(id: { eq: $id }) {
      ...DefaultMdFragment
    }
  }
`;
