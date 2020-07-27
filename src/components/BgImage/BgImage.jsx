import React from 'react';
import styled from '@emotion/styled';
import Img from 'gatsby-image';

import ArtImg from '../ArtImg';
// https://markoskon.com/gatsby-background-image-example/

const Parent = styled.div`
  position: relative;
  background-color: ${({ bc }) => bc};
`;
// TODO @media screen and (min-width: 600px) {
const FakeBgArtImage = styled(ArtImg)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ mobileHeight }) => mobileHeight};
  z-index: -1;

  & > img {
    object-fit: cover !important;
    object-position: 0% 0% !important;
  }

  @media screen and (min-width: 600px) {
    height: ${({ height }) => height};
  }
`;

const FakeBgImage = styled(Img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ mobileHeight }) => mobileHeight};
  z-index: -1;

  & > img {
    object-fit: cover !important;
    object-position: 0% 0% !important;
  }

  @media screen and (min-width: 600px) {
    height: ${({ height }) => height};
  }
`;
const Content = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
`;

const BgImage = ({
  fluid,
  title,
  alt,
  height = null,
  mobileHeight = null,
  overlayColor = 'transparent',
  children = null,
  className = null,
}) => (
  <Parent bc={overlayColor} title={title}>
    {Array.isArray(fluid) ? (
      <FakeBgArtImage
        fluidMobile={fluid[0]}
        fluidDesktop={fluid[1]}
        breakPoint={980}
        fadeIn={false}
        background
        critical
        alt={alt}
        height={height}
        mobileHeight={mobileHeight}
      />
    ) : (
      <FakeBgImage fluid={fluid} alt={alt} height={height} mobileHeight={mobileHeight} />
    )}
    <Content className={className}>{children}</Content>
  </Parent>
);

export default BgImage;
