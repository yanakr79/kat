import styled from '@emotion/styled';

const LeftRight = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  top: 0;
`;

export const Left = styled(LeftRight)`
  justify-content: center;
  background-color: inherit;
`;

export const Right = styled(LeftRight)`
  margin: 0 0 0 auto;
  padding-left: 1rem;
`;
