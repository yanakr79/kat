/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';

import useBanner from '../hooks/useBanner';
import { BaseLayout as Layout } from '../components/Layout';

import Section from '../components/Section';
import HalfContent from '../components/HalfContent';
import SectionHalfContent from '../components/SectionHalfContent';

const AboutTemplate = ({ path, data, pageContext: { locale } }) => {
  const { html, title, metaTitle, description, metaDescription, cover, sections } = data.page;

  const { img, alt, imgTitle } = useBanner(cover);

  return (
    <Layout title={title} subtitle={description} img={img} alt={alt} imgTitle={imgTitle}>
      <SEO locale={locale} title={metaTitle} description={metaDescription} pathname={path} />
      <Section text={sections[0].text} noContainer={false} small />
      <Section noContainer noPadding gray>
        <HalfContent items={sections[1].items} fullwidth />
      </Section>
      <SectionHalfContent data={sections[2]} noContainer={false} />
      {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
    </Layout>
  );
};

export default AboutTemplate;

export const pageQuery = graphql`
  query AboutPageQuery($id: String!) {
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
                  ...GatsbyImageSharpFluid_withWebp_noBase64
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
