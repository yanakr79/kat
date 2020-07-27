/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';

import 'lazysizes';
// import a plugin
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

import useBanner from '../hooks/useBanner';
import Layout from '../components/Layout';

import Section from '../components/Section';
import PageGallery from '../components/pages/gallery';

const GalleryTemplate = ({ path, data, pageContext: { locale } }) => {
  const { html, title, metaTitle, description, metaDescription, cover, sections } = data.page;
  const { img, alt, imgTitle } = useBanner(cover);

  return (
    <Layout title={title} subtitle={description} img={img} alt={alt} imgTitle={imgTitle}>
      <SEO locale={locale} title={metaTitle} description={metaDescription} pathname={path} />
      <Section text={sections[0].text} small />
      <PageGallery items={sections[1].items} />
      {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
    </Layout>
  );
};

export default GalleryTemplate;

export const pageQuery = graphql`
  query GalleryPageQuery($id: String!) {
    page: mdPage(id: { eq: $id }) {
      html
      ...DefaultFrontmatterFragment
      sections {
        text
        items {
          title
          image {
            alt
            author
            src {
              id
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                  originalImg
                }
              }
            }
          }
        }
      }
    }
  }
`;
