import colors from './colors';
import styles from './styles';
import { breakpointsArray as breakpoints } from './breakpoints';
import mediaQueries from './media-queries';
import { fontSizes, fontSizesPx, fontSizesRaw } from './font-sizes';
import { space, spacePx, spaceRaw } from './space';
import sizes from './sizes';
import shadows from './shadows';

import transition from './transition';

// import buttons from './buttons';

const theme = {
  initialColorMode: 'light',
  useColorSchemeMediaQuery: true,
  breakpoints,
  mediaQueries,
  space,
  spacePx,
  spaceRaw,
  fonts: {
    body:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
  },
  fontSizes,
  fontSizesPx,
  fontSizesRaw,
  fontWeights: {
    body: 400,
    heading: 700,
    semibold: 500,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  colors,
  text: {
    heading: {
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
    },
    brand: {
      color: 'brand.main',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'body',
    },
  },
  styles,
  layout: {
    header: {
      color: 'header.text',
      bg: 'header.bg',
      position: 'fixed',
      top: 0,
      left: 0,
      height: sizes.header,
      boxShadow: shadows.raised,
      fontSize: 1,
    },
    main: {
      mt: sizes.header,
      pb: sizes.header,
    },
    footer: {
      color: 'footer.text',
      bg: 'footer.bg',
      fontSize: 1,
      width: '100%',
      a: {
        color: 'footer.text',
        '&:active, &:focus, &:hover': {
          outline: 'none',
          textDecoration: 'none',
        },
      },
      colophon: {
        top: {
          width: '100%',
          py: '1.5rem',
          bg: 'footer.colophon.top.bg',
        },
        bottom: {
          width: '100%',
          py: '0.5rem',
          bg: 'footer.colophon.bottom.bg',
          fontSize: 0,
        },
      },
    },
    containerFW: {
      minWidth: 320,
      maxWidth: 1280,
      mx: 'auto',
    },
    container: {
      px: ['1rem', '2rem'],
      mx: 'auto',
    },
  },
  // buttons,
  transition,
};

export default theme;
