import useAuthorPrefix from './useAuthorPrefix';
import makeImagePopupTitle from '../helpers/makeImagePopupTitle';

const useBanner = (cover) => {
  const authorPrefix = useAuthorPrefix();
  if (!cover || !cover.default) {
    return null;
  }

  let img;
  if (cover.mobile) {
    img = [cover.mobile.childImageSharp.fluid, cover.default.childImageSharp.fluid];
    /*
    img = [
      {
        ...cover.mobile.childImageSharp.fluid,
        media: '(max-width: 1023px)',
      },
      {
        ...cover.default.childImageSharp.fluid,
        media: '(min-width: 1024px)',
      },
    ];
    */
  } else {
    img = cover.default.childImageSharp.fluid;
  }
  return {
    img,
    alt: cover.alt,
    imgTitle: makeImagePopupTitle(cover.alt, cover.author, authorPrefix),
  };
};

export default useBanner;
