import React from 'react';
import styled from '@emotion/styled';

const StyledLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  height: 0;
  width: 0;
  opacity: 0;
  z-index: -1;
`;

const StyledInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  height: 0;
  width: 0;
  opacity: 0;
  z-index: -1;
`;

const HoneyPotInput = ({ value, onChange }) => (
  <StyledLabel htmlFor="email">
    email
    <StyledInput
      id="email"
      type="email"
      name="email"
      tabIndex="-1"
      autoComplete="nope"
      placeholder="email"
      value={value}
      onChange={onChange}
    />
  </StyledLabel>
);

export default HoneyPotInput;
