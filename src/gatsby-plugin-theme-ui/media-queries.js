import { breakpoints } from './breakpoints';

const mq = {};
Object.keys(breakpoints).forEach((breakpoint) => {
  mq[breakpoint] = `@media (min-width: ${breakpoints[breakpoint]})`;
});

export default mq;
