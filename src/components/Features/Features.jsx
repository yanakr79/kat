/* eslint-disable react/no-array-index-key */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import Img from 'gatsby-image';

import makeImagePopupTitle from '../../helpers/makeImagePopupTitle';
import useAuthorPrefix from '../../hooks/useAuthorPrefix';
import Section from '../Section';

const Features = ({ data, gray, imageStyle }) => {
  const authorPrefix = useAuthorPrefix();
  const { title, subtitle, items } = data;

  return (
    <Section title={title} subtitle={subtitle} gray={gray} noContainer={false}>
      <div
        sx={{
          display: 'flex',
          // alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          textAlign: 'center',
        }}
      >
        {items.map(({ text, image }, i) => (
          <div key={i} sx={{ width: ['100%', '100%', '33.33%'], px: 4, mb: [8, 8, 0] }}>
            {image.src && (
              <Img
                fluid={image.src.childImageSharp.fluid}
                alt={image.alt}
                title={makeImagePopupTitle(image.alt, image.author, authorPrefix)}
                sx={imageStyle}
              />
            )}
            <div sx={{ mt: 3 }}>{text}</div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Features;
