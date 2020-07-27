import preval from 'preval.macro';

const s = preval`
  const b = {
    xs: '400px',
    sm: '550px',
    md: '750px',
    lg: '1000px',
    xl: '1200px',
    xxl: '1600px',
  };
  const bp = Object.keys(b).map((key) => b[key]);
  module.exports = { b, bp };
`;

export const breakpoints = s.b;
export const breakpointsArray = s.bp;
