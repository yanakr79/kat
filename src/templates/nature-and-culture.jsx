/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';

import useBanner from '../hooks/useBanner';
import Layout from '../components/Layout';

import Section from '../components/Section';
import SectionHalfContent from '../components/SectionHalfContent';

const NatureAndCultureTemplate = ({ path, data, pageContext: { locale } }) => {
  const { html, title, metaTitle, description, metaDescription, cover, sections } = data.page;

  const { img, alt, imgTitle } = useBanner(cover);

  return (
    <Layout title={title} subtitle={description} img={img} alt={alt} imgTitle={imgTitle}>
      <SEO locale={locale} title={metaTitle} description={metaDescription} pathname={path} />
      <Section text={sections[0].text} small />
      <SectionHalfContent data={sections[1]} />
      <SectionHalfContent data={sections[2]} left />
      {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
    </Layout>
  );
};

export default NatureAndCultureTemplate;

export const pageQuery = graphql`
  query NatureAndCulturePageQuery($id: String!) {
    page: mdPage(id: { eq: $id }) {
      html
      ...DefaultFrontmatterFragment
      sections {
        title
        subtitle
        text
        items {
          title
          text
          image {
            src {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            alt
            author
          }
        }
      }
    }
  }
`;
