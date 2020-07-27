/** @jsx jsx */
import { jsx } from 'theme-ui';
import Container from '../Container';

import Navbar from '../Navbar';

// const rootPath = `${__PATH_PREFIX__}/`;
//   if (location.pathname === rootPath) {

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  contain: 'layout',
  variant: 'layout.header',
  zIndex: 200,
};

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  bg: 'inherit',
};

const Header = () => (
  <header role="navigation" sx={headerStyle}>
    <Container sx={containerStyle}>
      <Navbar />
    </Container>
  </header>
);

export default Header;
