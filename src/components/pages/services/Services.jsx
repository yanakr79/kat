/* eslint-disable react/no-danger */
/* eslint-disable react/no-array-index-key */
/** @jsx jsx */
import React from 'react';
import { jsx, Heading } from 'theme-ui';
import Img from 'gatsby-image';

import useAuthorPrefix from '../../../hooks/useAuthorPrefix';
import makeImagePopupTitle from '../../../helpers/makeImagePopupTitle';
import mq from '../../../gatsby-plugin-theme-ui/media-queries';

const styleWrapper = {
  display: 'flex',
  flexWrap: 'wrap',
  mb: '5em',
  [mq.lg]: {
    mb: '6rem',
    alignItems: 'center',
  },
};

const styleLeftWrapper = {
  width: '100%',
  [mq.lg]: {
    width: '40%',
  },
};

const styleRightWrapper = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  textAlign: 'left',
  p: '1.75rem 0 0',
  width: '100%',
  [mq.lg]: {
    width: '60%',
    p: '0 1rem 0 3rem',
  },
};

const Services = ({ data }) => {
  const authorPrefix = useAuthorPrefix();
  return (
    <React.Fragment>
      {data.items.map(({ title, text, image: { src, alt, author } }, i) => (
        <div key={i} sx={styleWrapper}>
          <div sx={styleLeftWrapper}>
            {src && (
              <Img
                fluid={src.childImageSharp.fluid}
                alt={alt}
                title={makeImagePopupTitle(alt, author, authorPrefix)}
              />
            )}
          </div>
          <div sx={styleRightWrapper}>
            {title && (
              <Heading as="h4" sx={{ mb: 2 }}>
                {title}
              </Heading>
            )}
            {text && <div dangerouslySetInnerHTML={{ __html: text }} />}
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};

export default Services;
