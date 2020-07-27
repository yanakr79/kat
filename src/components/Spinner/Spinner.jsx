/** @jsx jsx */
import styled from '@emotion/styled';
import { jsx, css, keyframes } from '@emotion/core';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
  position: relative;
`;

const InnerWrapper = styled.div`
  border: 2px solid #ccc;
  border-top-color: ${(p) => p.theme.colors.text};
`;
/**
 *
 * @param {w} w spinner width/height in rem
 *
 * default - 1.5rem
 *
 * Sample: <Spinner w="2" />
 *
 */
const Spinner = ({ w = 1.5 }) => {
  const style = css`
    position: absolute;
    top: 50%;
    left: 50%;
    width: ${w}rem;
    height: ${w}rem;
    margin-top: -${w / 2}rem;
    margin-left: -${w / 2}rem;
    border-radius: 50%;
    animation: ${spin} 0.8s linear infinite;
  `;

  return (
    <Wrapper css={style}>
      <InnerWrapper css={style} />
    </Wrapper>
  );
};

export default Spinner;
