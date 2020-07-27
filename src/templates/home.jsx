/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-props-no-spreading */
/** @jsx jsx */
import { graphql } from 'gatsby';
import { jsx } from 'theme-ui';
import SEO from '../components/SEO';

import useBanner from '../hooks/useBanner';
import { BaseLayout as Layout } from '../components/Layout';

import Section from '../components/Section';
import Features from '../components/Features';

const HomeTemplate = ({ path, data, pageContext: { locale } }) => {
  const { html, title, metaTitle, description, metaDescription, cover, sections } = data.page;

  const { img, alt, imgTitle } = useBanner(cover);

  return (
    <Layout title={title} subtitle={description} img={img} alt={alt} imgTitle={imgTitle}>
      <SEO locale={locale} title={metaTitle} description={metaDescription} pathname={path} />
      <Section text={sections[0].text} noContainer={false} small />
      <Features data={sections[1]} imageStyle={{ borderRadius: '50%' }} gray />
      <Features data={sections[2]} />
      {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
    </Layout>
  );
};

export default HomeTemplate;

export const pageQuery = graphql`
  query HomePageQuery($id: String!) {
    page: mdPage(id: { eq: $id }) {
      html
      ...DefaultFrontmatterFragment

      sections {
        title
        subtitle
        text
        items {
          text
          image {
            src {
              childImageSharp {
                fluid(maxWidth: 400) {
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
