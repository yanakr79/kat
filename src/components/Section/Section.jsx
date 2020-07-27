/* eslint-disable react/no-danger */
/** @jsx jsx */
import React from 'react';
import { jsx, Heading } from 'theme-ui';
import Container from '../Container';

const styleSection = {
  backgroundPosition: '50%',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  my: 10,
  mx: 0,
  overflow: 'hidden',
};

const styleNoPading = {
  m: 0,
  p: 0,
};

const styleSmall = {
  my: 8,
  mx: 0,
};

const styleGray = {
  m: 0,
  py: 8,
  px: 0,
  bg: '#d2d1ce',
};

const wrapStyle = {
  mb: 10,
};
const headingWrapStyle = {
  textAlign: 'center',
};
const subtitleStyle = {
  mt: 2,
};
const textStyle = {
  mt: 7,
  textAlign: 'justify',
};

const Text = ({ title, subtitle, text }) => (
  <React.Fragment>
    <div sx={headingWrapStyle}>
      {title && <Heading variant="brand">{title}</Heading>}
      {subtitle && <p sx={subtitleStyle}>{subtitle}</p>}
    </div>
    {text && <div sx={textStyle} dangerouslySetInnerHTML={{ __html: text }} />}
  </React.Fragment>
);

const Section = ({
  noPadding,
  small,
  gray,
  extraStyle = {},
  title,
  subtitle,
  text,
  noContainer = true,
  children,
}) => {
  const hasText = title || subtitle || text;

  return (
    <section
      sx={{
        ...styleSection,
        ...(small ? styleSmall : {}),
        ...(gray ? styleGray : {}),
        ...(noPadding ? styleNoPading : {}),
        ...extraStyle,
      }}
    >
      {hasText && noContainer ? (
        <div sx={wrapStyle}>
          <Text title={title} subtitle={subtitle} text={text} />
        </div>
      ) : (
        <Container sx={wrapStyle}>
          <Text title={title} subtitle={subtitle} text={text} />
        </Container>
      )}
      {noContainer ? children : <Container>{children}</Container>}
    </section>
  );
};
export default Section;
