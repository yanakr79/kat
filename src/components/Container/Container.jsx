/* eslint-disable react/jsx-props-no-spreading */
/** @jsx jsx */
import { jsx } from 'theme-ui';

const ContainerFullWidth = ({ children, ...props }) => (
  <div sx={{ variant: 'layout.containerFW' }} {...props}>
    {children}
  </div>
);

const Container = ({ children, sx = {}, ...props }) => (
  <ContainerFullWidth sx={{ variant: 'layout.container', ...sx }} {...props}>
    {children}
  </ContainerFullWidth>
);

export { ContainerFullWidth };

export default Container;
