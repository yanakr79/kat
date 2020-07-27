/**
 * https://github.com/n8tb1t/use-scroll-position
 * https://github.com/n8tb1t/use-scroll-position/blob/master/examples/navbar/src/pages/navbar.jsx
 *
 */
import { useRef, useEffect, useLayoutEffect } from 'react';

const isBrowser = typeof window !== 'undefined';
const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;

const getScrollYPosition = (element, useWindow) => {
  if (!isBrowser) {
    return 0;
  }
  if (useWindow) {
    return window.scrollY;
  }

  const target = element ? element.current : document.body;
  const position = target.getBoundingClientRect();

  return position.top;
};

const useScrollYPosition = (effect, deps, element, useWindow, wait) => {
  const position = useRef(getScrollYPosition(useWindow));

  let throttleTimeout = null;

  const callBack = () => {
    const currPos = getScrollYPosition(element, useWindow);
    effect(position.current, currPos);
    position.current = currPos;
    throttleTimeout = null;
  };

  useIsomorphicLayoutEffect(() => {
    const handleScroll = () => {
      if (wait) {
        if (throttleTimeout === null) {
          throttleTimeout = setTimeout(callBack, wait);
        }
      } else {
        callBack();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, deps);
};

export default useScrollYPosition;
