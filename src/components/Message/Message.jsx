/* eslint-disable import/no-duplicates */
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { FaExclamationTriangle } from 'react-icons/fa';
import { FaCheckCircle } from 'react-icons/fa';

const iconStyle = css({
  marginRight: '1rem',
  width: '3rem',
  height: '3rem',
});

const Wrapper = styled.div`
  display: flex;
`;

const Message = ({ type, children }) => {
  let icon = null;
  switch (type) {
    case 'error':
      icon = <FaExclamationTriangle css={[iconStyle, { color: 'red' }]} />;
      break;
    case 'success':
      icon = <FaCheckCircle css={[iconStyle, { color: 'green' }]} />;
      break;
    default:
      break;
  }

  return (
    <Wrapper>
      {icon}
      <div>{children}</div>
    </Wrapper>
  );
};

export default Message;
