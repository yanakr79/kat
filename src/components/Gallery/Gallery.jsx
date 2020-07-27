/** @jsx jsx */
import { jsx } from 'theme-ui';
import Img from 'gatsby-image';

const chunk = (a, groupSize) => {
  const groups = [];
  for (let i = 0; i < a.length; i += groupSize) {
    groups.push(a.slice(i, i + groupSize));
  }
  return groups;
};

const sum = (a) => a.reduce((accumulator, currentValue) => accumulator + currentValue);

// https://blog.usejournal.com/building-highly-performant-masonry-layouts-with-gatsby-js-54115acc3e72
// https://github.com/simonyiszk/schdesign-web/blob/1ee8aa87b702a1ef0473e8a553207c3a2355d128/src/components/Gallery.tsx
const Gallery = ({ sx, images, itemsPerRow: itemsPerRowByBreakpoints, onClick }) => {
  const aspectRatios = images.map((image) => image.aspectRatio);
  const rowAspectRatioSumsByBreakpoints = itemsPerRowByBreakpoints.map((itemsPerRow) =>
    chunk(aspectRatios, itemsPerRow).map((rowAspectRatios) => sum(rowAspectRatios)),
  );

  return (
    <div sx={sx}>
      {images.map((image, i) => (
        <a
          key={image.id}
          href={image.originalImg}
          onClick={(e) => {
            e.preventDefault();
            onClick(i);
          }}
        >
          <Img
            fluid={image}
            title={image.caption}
            alt={image.alt}
            sx={{
              display: 'inline-block',
              verticalAlign: 'middle',
              transition: 'filter 0.3s',
              ':hover': {
                filter: 'brightness(87.5%)',
              },
              width: rowAspectRatioSumsByBreakpoints.map((rowAspectRatioSums, j) => {
                const rowIndex = Math.floor(i / itemsPerRowByBreakpoints[j]);
                const rowAspectRatioSum = rowAspectRatioSums[rowIndex];

                return `${(image.aspectRatio / rowAspectRatioSum) * 100}%`;
              }),
            }}
            onClick={() => onClick(i)}
          />
        </a>
      ))}
    </div>
  );
};

export default Gallery;
