/** @jsx jsx */
import { jsx, Heading } from 'theme-ui';

import mq from '../../gatsby-plugin-theme-ui/media-queries';
import BgImage from '../BgImage';

const styleTitle = {
  fontSize: '2rem',
  [mq.lg]: {
    fontSize: '4.65rem',
  },
};

const styleSubtitle = {
  fontSize: '1.2rem',
  [mq.lg]: {
    fontSize: '2.875rem',
  },
};

const Hero = ({ title, subtitle, img, alt, imgTitle }) => {
  if (!img) {
    return (
      <div>
        {title && <h1 sx={styleTitle}>{title}</h1>}
        {subtitle && <p sx={styleSubtitle}>{subtitle}</p>}
      </div>
    );
  }
  //  overlayColor="#04040454"
  return (
    <BgImage alt={alt} title={imgTitle} fluid={img}>
      <div
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          height: '100%',
          px: 6,
          textTransform: 'uppercase',
          textShadow: '1px 1px 6px rgba(0, 0, 0, 0.7)',
          textAlign: 'center',
          [mq.md]: {
            lineHeight: 1.25,
          },
        }}
      >
        {title && (
          <Heading as="h1" sx={styleTitle}>
            {title}
          </Heading>
        )}
        {subtitle && <p sx={styleSubtitle}>{subtitle}</p>}
      </div>
    </BgImage>
  );
};

export default Hero;
