import React from 'react';
import styled from '@emotion/styled';

export const ModalWrapper = styled.div({
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
});

export const ModalOverlay = styled.div({
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 1000,
});

const CloseButtonWrap = styled.div`
  position: absolute;
  right: 0.5rem;
  top: 1rem;
`;

const CloseButton = styled.button`
  position: relative;
  width: 1.5rem;
  height: 1.75rem;
  opacity: 0.3;
  border: 0;
  background-color: transparent;

  &:hover {
    opacity: 1;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 1rem;
    height: 1.5rem;
    width: 2px;
    background-color: #333;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`;

export const StyledModalCloseButton = ({ onClick }) => (
  <CloseButtonWrap>
    <CloseButton
      type="button"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    />
  </CloseButtonWrap>
);

export const ModalContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 26rem;
  top: 0;
  margin: 3.75rem auto;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.1) 0 7px 14px 0, rgba(0, 0, 0, 0.07) 0 3px 6px 0;
  outline: 0;
  z-index: 1400;
`;

export const ModalHeader = styled.div`
  position: relative;
  padding: 1rem 1.5rem;
  font-size: 1.25rem;
  font-weight: 600;
`;

export const ModalBody = styled.div`
  padding: 0.5rem 1.5rem 2.5rem;
  flex: 1 1 0%;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: ${(p) => p.justify || 'flex-end'};
  padding: 2rem 1.5rem;
`;
