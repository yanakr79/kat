/** @jsx jsx */
import { jsx } from 'theme-ui';

import Container from '../Container';
import Layout from './BaseLayout';
import sizes from '../../gatsby-plugin-theme-ui/sizes';

const containerStyle = { mt: sizes.header };

const PageLayout = ({ title, subtitle, img, alt, imgTitle, hero, children }) => (
  <Layout title={title} subtitle={subtitle} img={img} alt={alt} imgTitle={imgTitle} hero={hero}>
    <Container sx={containerStyle}>{children}</Container>
  </Layout>
);

export default PageLayout;
