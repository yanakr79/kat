/* eslint-disable react/no-array-index-key */
/** @jsx jsx */
import React from 'react';
import { jsx, Heading } from 'theme-ui';
import Img from 'gatsby-image';

import useAuthorPrefix from '../../hooks/useAuthorPrefix';
import makeImagePopupTitle from '../../helpers/makeImagePopupTitle';
import mq from '../../gatsby-plugin-theme-ui/media-queries';

const styleWrapper = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
};

const styleWrapperLeft = {
  [mq.lg]: {
    flexDirection: 'row-reverse',
  },
};

const styleContentWrapper = {
  width: '100%',
  [mq.lg]: {
    width: '50%',
  },
};

const styleText = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  textAlign: 'left',
  p: '2rem 0',
  [mq.lg]: {
    width: '50%',
    p: '0 3rem',
  },
};
const styleTextFullWidth = {
  p: ['1rem', '2rem'],
};

const styleLeft = {
  [mq.lg]: {
    width: '50%',
    p: '0 3rem',
    textAlign: 'right',
  },
};

const HalfContent = ({ items, fullwidth = false, left = false }) =>
  items.map(({ component, title, text, image }, i) => {
    return (
      <HalfContentItem
        key={i}
        component={component}
        title={title}
        text={text}
        image={image}
        fullwidth={fullwidth}
        left={i % 2 ? !left : left}
      />
    );
  });

const HalfContentItem = ({ component, title, text, image, fullwidth, left }) => {
  const authorPrefix = useAuthorPrefix();
  const textContent = component || (
    <React.Fragment>
      {title && (
        <Heading as="h4" sx={{ mb: 2 }}>
          {title}
        </Heading>
      )}
      {text && <div>{text}</div>}
    </React.Fragment>
  );
  const imgContent =
    image && image.src ? (
      <Img
        fluid={image.src.childImageSharp.fluid}
        alt={image.alt}
        title={makeImagePopupTitle(image.alt, image.author, authorPrefix)}
      />
    ) : null;

  const textStyle = {
    ...styleText,
    ...(fullwidth ? styleTextFullWidth : {}),
  };

  if (left) {
    return (
      <div sx={{ ...styleWrapper, ...styleWrapperLeft }}>
        <div sx={styleContentWrapper}>{imgContent}</div>
        <div sx={{ ...styleContentWrapper, ...textStyle, ...styleLeft }}>{textContent}</div>
      </div>
    );
  }

  return (
    <div sx={styleWrapper}>
      <div sx={styleContentWrapper}>{imgContent}</div>
      <div sx={{ ...styleContentWrapper, ...textStyle }}>{textContent}</div>
    </div>
  );
};

export default HalfContent;
