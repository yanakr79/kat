import { graphql } from 'gatsby';

export const defaultFrontmatterFragment = graphql`
  fragment DefaultFrontmatterFragment on MdPage {
    title
    description
    metaTitle
    metaDescription
    cover {
      default {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
      mobile {
        childImageSharp {
          fluid(maxWidth: 480) {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
      alt
      author
    }
    noindex
  }
`;

export const defaultMdFragment = graphql`
  fragment DefaultMdFragment on MdPage {
    html
    ...DefaultFrontmatterFragment
  }
`;
