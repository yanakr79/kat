/** @jsx jsx */
import { useState } from 'react';
import { jsx } from 'theme-ui';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import Gallery from '../../Gallery';
import useAuthorPrefix from '../../../hooks/useAuthorPrefix';
import makeImagePopupTitle from '../../../helpers/makeImagePopupTitle';

const PageGallery = ({ items }) => {
  const [openLightbox, setOpenLightbox] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const authorPrefix = useAuthorPrefix();

  if (!openLightbox) {
    const images = items
      .filter(({ image }) => image && image.src)
      .map(({ title, image }) => ({
        id: image.src.id,
        ...image.src.childImageSharp.fluid,
        caption: makeImagePopupTitle(title, image.author, authorPrefix),
        alt: image.src.alt,
      }));
    return (
      <Gallery
        sx={{ mb: 6 }}
        images={images}
        itemsPerRow={[2, 2, 2, 3, 4]}
        onClick={(i) => {
          setPhotoIndex(i);
          setOpenLightbox(true);
        }}
      />
    );
  }

  const lbImages = items.map(({ image }) => image.src.childImageSharp.fluid.originalImg);

  return (
    <Lightbox
      mainSrc={lbImages[photoIndex]}
      nextSrc={lbImages[(photoIndex + 1) % lbImages.length]}
      prevSrc={lbImages[(photoIndex + lbImages.length - 1) % lbImages.length]}
      onCloseRequest={() => setOpenLightbox(false)}
      onMovePrevRequest={() => setPhotoIndex((photoIndex + lbImages.length - 1) % lbImages.length)}
      onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % lbImages.length)}
    />
  );
};

export default PageGallery;
