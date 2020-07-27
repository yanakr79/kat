import React from 'react';
import styled from '@emotion/styled';
import mq from '../../gatsby-plugin-theme-ui/media-queries';

const Wrap = styled.div`
  height: ${(p) => p.w}rem;
  width: ${(p) => p.w}rem;
  margin: 0 0.5rem 0 -0.5rem;
  cursor: pointer;

  ${mq.lg} {
    display: none;
    pointer-events: none;
  }
`;

const InnerWrap = styled.div`
  position: relative;
  top: 0;
  height: 1.3rem;
  width: 1.9rem;
  margin-top: 1.2rem;
  margin-left: 0.6rem;
  cursor: pointer;
  transform: rotate(0deg);
  transition: 0.5s ease-in-out;

  span,
  span::before,
  span::after {
    border-radius: 1px;
    height: 0.125rem;
    width: 1.25rem;
    position: absolute;
    display: block;
    content: '';
    transition: all 300ms ease-in-out;
    background-color: ${(p) => p.theme.colors.text};
  }

  span {
    background-color: ${(p) => (p.open ? 'transparent' : p.theme.colors.text)};

    &::before {
      top: ${(p) => (p.open ? 0 : '-0.625rem')};
      transform: ${(p) => (p.open ? 'rotate(45deg)' : 'none')};
    }

    &::after {
      top: ${(p) => (p.open ? 0 : '0.625rem')};
      bottom: -0.625rem;
      transform: ${(p) => (p.open ? 'rotate(-45deg)' : 'none')};
    }
  }
`;

const Hamburger = ({ w = 2.5, open, onClick }) => {
  return (
    <Wrap type="button" w={w} aria-label="Close" onClick={onClick}>
      <InnerWrap open={open}>
        <span />
      </InnerWrap>
    </Wrap>
  );
};

export default Hamburger;
