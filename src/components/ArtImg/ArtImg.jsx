/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

// Handle legacy names for image queries.
const convertProps = (props) => {
  const convertedProps = { ...props };

  if (convertedProps.resolutions) {
    if (convertProps.fixedMobile) {
      convertedProps.fixedMobile = convertedProps.sizes;
    } else {
      convertedProps.fixedDesktop = convertedProps.sizes;
    }
    delete convertedProps.resolutions;
  }

  if (convertedProps.sizes) {
    if (convertProps.fluidMobile) {
      convertedProps.fluidMobile = convertedProps.sizes;
    } else {
      convertedProps.fluidDesktop = convertedProps.sizes;
    }
    delete convertedProps.sizes;
  }

  return convertedProps;
};

// Cache if we've seen an image before so we don't both with
// lazy-loading & fading in on subsequent mounts.
const imageCache = {};
const inImageCache = (props) => {
  const convertedProps = convertProps(props);
  // Find src
  const src = convertedProps.fluidMobile
    ? convertedProps.fluidMobile.src
    : convertedProps.fluidDesktop
    ? convertedProps.fluidDesktop.src
    : convertedProps.fixedMobile
    ? convertedProps.fixedMobile.src
    : convertedProps.fixedDesktop.src;

  return imageCache[src] || false;
};

const activateCacheForImage = (props) => {
  const convertedProps = convertProps(props);
  // Find src
  const src = convertedProps.fluidMobile
    ? convertedProps.fluidMobile.src
    : convertedProps.fluidDesktop
    ? convertedProps.fluidDesktop.src
    : convertedProps.fixedMobile
    ? convertedProps.fixedMobile.src
    : convertedProps.fixedDesktop.src;

  imageCache[src] = true;
};

let io;
const listeners = [];

function getIO() {
  if (typeof io === 'undefined' && typeof window !== 'undefined' && window.IntersectionObserver) {
    io = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          listeners.forEach((l) => {
            if (l[0] === entry.target) {
              // Edge doesn't currently support isIntersecting, so also test for an intersectionRatio > 0
              if (entry.isIntersecting || entry.intersectionRatio > 0) {
                io.unobserve(l[0]);
                l[1]();
              }
            }
          });
        });
      },
      { rootMargin: '200px' },
    );
  }

  return io;
}

const listenToIntersections = (el, cb) => {
  getIO().observe(el);
  listeners.push([el, cb]);
};

const noscriptImgMobile = (props) => {
  // Check if prop exists before adding each attribute to the string output below to prevent
  // HTML validation issues caused by empty values like width="" and height=""
  const sizes = props.sizes ? `sizes="${props.sizes}" ` : '';
  const srcSetWebp = props.srcSetWebp
    ? `<source type='image/webp' srcset="${props.srcSetWebp}" ${sizes} />`
    : '';
  const srcSet = props.srcSet ? `<source srcset="${props.srcSet}" ${sizes} />` : '';
  return `<picture>${srcSetWebp}${srcSet}`;
};

const noscriptImgDesktop = (props) => {
  // Check if prop exists before adding each attribute to the string output below to prevent
  // HTML validation issues caused by empty values like width="" and height=""
  const src = props.src ? `src="${props.src}" ` : 'src="" '; // required attribute
  const sizes = props.sizes ? `sizes="${props.sizes}" ` : '';
  const srcSetWebp = props.srcSetWebp
    ? `<source type='image/webp' srcset="${props.srcSetWebp}" ${sizes} />`
    : '';
  const srcSet = props.srcSet ? `<source srcset="${props.srcSet}" ${sizes}/>` : '';
  const title = props.title ? `title="${props.title}" ` : '';
  const alt = props.alt ? `alt="${props.alt}" ` : 'alt="" '; // required attribute
  const width = props.width ? `width="${props.width}" ` : '';
  const height = props.height ? `height="${props.height}" ` : '';
  const opacity = props.opacity ? props.opacity : '1';
  const transitionDelay = props.transitionDelay ? props.transitionDelay : '0.5s';
  return `${srcSetWebp}${srcSet}<img ${width}${height}${src}${alt}${title}style="position:absolute;top:0;left:0;transition:opacity 0.5s;transition-delay:${transitionDelay};opacity:${opacity};width:100%;height:100%;object-fit:cover;object-position:center"/></picture>`;
};

const Img = React.forwardRef((props, ref) => {
  const { sizes, srcSet, src, style, onLoad, onError, ...otherProps } = props;

  return (
    // eslint-disable-next-line
    <img
      sizes={sizes}
      srcSet={srcSet}
      src={src}
      {...otherProps}
      onLoad={onLoad}
      onError={onError}
      ref={ref}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
        ...style,
      }}
    />
  );
});

class ArtImg extends React.Component {
  constructor(props) {
    super(props);

    // default settings for browser without Intersection Observer available
    let isVisible = true;
    const imgLoaded = false;
    let IOSupported = false;
    const fadeIn = { props };

    // If this image has already been loaded before then we can assume it's
    // already in the browser cache so it's cheap to just show directly.
    const seenBefore = inImageCache(props);

    // browser with Intersection Observer available
    if (!seenBefore && typeof window !== 'undefined' && window.IntersectionObserver) {
      isVisible = false;
      IOSupported = true;
    }

    // Never render image during SSR
    if (typeof window === 'undefined') {
      isVisible = false;
    }

    // Force render for critical images
    if (props.critical) {
      isVisible = true;
      IOSupported = false;
    }

    const hasNoScript = !(this.props.critical && !this.props.fadeIn);

    this.state = {
      isVisible,
      imgLoaded,
      IOSupported,
      fadeIn,
      hasNoScript,
      seenBefore,
    };

    this.imageRef = React.createRef();
    this.handleImageLoaded = this.handleImageLoaded.bind(this);
    this.handleRef = this.handleRef.bind(this);
  }

  componentDidMount() {
    if (this.state.isVisible && typeof this.props.onStartLoad === 'function') {
      this.props.onStartLoad({ wasCached: inImageCache(this.props) });
    }
    if (this.props.critical) {
      const img = this.imageRef.current;
      if (img && img.complete) {
        this.handleImageLoaded();
      }
    }
  }

  handleRef(ref) {
    if (this.state.IOSupported && ref) {
      listenToIntersections(ref, () => {
        const imageInCache = inImageCache(this.props);
        if (!this.state.isVisible && typeof this.props.onStartLoad === 'function') {
          this.props.onStartLoad({ wasCached: imageInCache });
        }

        this.setState({ isVisible: true, imgLoaded: imageInCache });
      });
    }
  }

  handleImageLoaded() {
    activateCacheForImage(this.props);

    this.setState({ imgLoaded: true });
    if (this.state.seenBefore) {
      this.setState({ fadeIn: false });
    }

    if (this.props.onLoad) {
      this.props.onLoad();
    }
  }

  render() {
    const {
      title,
      alt,
      className,
      style = {},
      imgStyle = {},
      placeholderStyle = {},
      placeholderClassName,
      fluidMobile,
      fluidDesktop,
      fixedMobile,
      fixedDesktop,
      breakPoint,
      backgroundColor,
      Tag,
      itemProp,
    } = convertProps(this.props);

    const bgColor = typeof backgroundColor === 'boolean' ? 'lightgray' : backgroundColor;

    const imagePlaceholderStyle = {
      opacity: this.state.imgLoaded ? 0 : 1,
      transition: 'opacity 0.5s',
      transitionDelay: this.state.imgLoaded ? '0.5s' : '0.25s',
      ...imgStyle,
      ...placeholderStyle,
    };

    const imageStyle = {
      opacity: this.state.imgLoaded || this.state.fadeIn === false ? 1 : 0,
      transition: this.state.fadeIn === true ? 'pacity 0.5s' : 'none',
      ...imgStyle,
    };

    const placeholderImageProps = {
      title,
      alt: !this.state.isVisible ? alt : '',
      style: imagePlaceholderStyle,
    };

    if (fluidMobile && fluidDesktop) {
      const imageMobile = fluidMobile;
      const imageDesktop = fluidDesktop;

      const TagAspect = styled(Tag)`
        width: 100%;
        padding-bottom: ${100 / imageMobile.aspectRatio}%;

        @media screen and (min-width: ${breakPoint}px) {
          padding-bottom: ${100 / imageDesktop.aspectRatio}%;
        }
      `;

      const ImgFluidOnlyMobile = styled(Img)`
        @media screen and (min-width: ${breakPoint}px) {
          display: none;
        }
      `;

      const ImgFluidOnlyDesktop = styled(Img)`
        @media screen and (max-width: ${breakPoint - 1}px) {
          display: none;
        }
      `;

      return (
        <Tag
          className={`${className || ''} gatsby-image-wrapper`}
          style={{
            position: 'relative',
            overflow: 'hidden',
            ...style,
          }}
          ref={this.handleRef}
          key={`fluid-${JSON.stringify(imageDesktop.srcSet)}`}
        >
          {/* Preserve the aspect ratio. */}
          <TagAspect />

          {/* Show the blurry base64 image. */}
          {imageMobile.base64 && imageDesktop.base64 && (
            <>
              <ImgFluidOnlyMobile
                className={placeholderClassName || ''}
                src={imageMobile.base64}
                {...placeholderImageProps}
              />
              <ImgFluidOnlyDesktop
                className={placeholderClassName || ''}
                src={imageDesktop.base64}
                {...placeholderImageProps}
              />
            </>
          )}

          {/* Show the traced SVG image. */}
          {imageMobile.tracedSVG && imageDesktop.tracedSVG && (
            <>
              <ImgFluidOnlyMobile
                className={placeholderClassName || ''}
                src={imageMobile.tracedSVG}
                {...placeholderImageProps}
              />
              <ImgFluidOnlyDesktop
                className={placeholderClassName || ''}
                src={imageDesktop.tracedSVG}
                {...placeholderImageProps}
              />
            </>
          )}

          {/* Show a solid background color. */}
          {bgColor && (
            <Tag
              title={title}
              style={{
                backgroundColor: bgColor,
                position: 'absolute',
                top: 0,
                bottom: 0,
                opacity: !this.state.imgLoaded ? 1 : 0,
                transitionDelay: '0.35s',
                right: 0,
                left: 0,
              }}
            />
          )}

          {/* Once the image is visible (or the browser doesn't support IntersectionObserver), start downloading the image */}
          {this.state.isVisible && (
            <picture>
              {imageMobile.srcSetWebp && (
                <source
                  media={`(max-width: ${breakPoint - 1}px)`}
                  type="image/webp"
                  srcSet={imageMobile.srcSetWebp}
                  sizes={imageMobile.sizes}
                />
              )}

              <source
                media={`(max-width: ${breakPoint - 1}px)`}
                srcSet={imageMobile.srcSet}
                sizes={imageDesktop.sizes}
              />

              {imageDesktop.srcSetWebp && (
                <source
                  media={`(min-width: ${breakPoint}px)`}
                  type="mage/webp"
                  srcSet={imageDesktop.srcSetWebp}
                  sizes={imageDesktop.sizes}
                />
              )}

              <source
                media={`(min-width: ${breakPoint}px)`}
                srcSet={imageDesktop.srcSet}
                sizes={imageDesktop.sizes}
              />

              <Img
                alt={alt}
                title={title}
                src={imageDesktop.src}
                style={imageStyle}
                ref={this.imageRef}
                onLoad={this.handleImageLoaded}
                onError={this.props.onError}
                itemProp={itemProp}
              />
            </picture>
          )}

          {/* Show the original image during server-side rendering if JavaScript is disabled */}
          {this.state.hasNoScript && (
            <noscript
              dangerouslySetInnerHTML={{
                __html:
                  noscriptImgMobile({ ...imageMobile }) +
                  noscriptImgDesktop({
                    alt,
                    title,
                    ...imageDesktop,
                  }),
              }}
            />
          )}
        </Tag>
      );
    }

    if (fixedMobile && fixedDesktop) {
      const imageMobile = fixedMobile;
      const imageDesktop = fixedDesktop;

      const divStyle = {
        position: 'relative',
        overflow: 'hidden',
        display: 'inline-block',
        ...style,
      };

      const wrapClass = `${imageMobile.width}-${imageMobile.height}-${imageDesktop.width}-${imageDesktop.height}`;

      const ImgFixedOnlyMobile = styled(Img)`
        @media screen and (min-width: ${breakPoint}px) {
          display: none;
        }
      `;

      const ImgFixedOnlyDesktop = styled(Img)`
        @media screen and (max-width: ${breakPoint - 1}px) {
          display: none;
        }
      `;

      const TagFixedBk = styled(Tag)`
        width: ${imageMobile.width}px;
        height: ${imageMobile.height}px;

        @media screen and (min-width: ${breakPoint}px) {
          width: ${imageDesktop.width}px;
          height: ${imageDesktop.height}px;
        }
      `;

      if (style.display === 'inherit') {
        delete divStyle.display;
      }

      return (
        <>
          <style>{`
            .fixed-${wrapClass} {
              width: ${imageMobile.width}px;
              height: ${imageMobile.height}px;
            }
            @media screen and (min-width: ${breakPoint}px) {
              .fixed-${wrapClass} {
                width: ${imageDesktop.width}px;
                height: ${imageDesktop.height}px;
              }
            }
          `}</style>
          <Tag
            className={`${className || ''} fixed-${wrapClass} gatsby-image-wrapper`}
            style={divStyle}
            ref={this.handleRef}
            key={`fixed-${JSON.stringify(imageDesktop.srcSet)}`}
          >
            {/* Show the blurry base64 image. */}
            {imageMobile.base64 && imageDesktop.base64 && (
              <>
                <ImgFixedOnlyMobile
                  className={placeholderClassName || ''}
                  src={imageMobile.base64}
                  {...placeholderImageProps}
                />
                <ImgFixedOnlyDesktop
                  className={placeholderClassName || ''}
                  src={imageDesktop.base64}
                  {...placeholderImageProps}
                />
              </>
            )}

            {/* Show the traced SVG image. */}
            {imageMobile.tracedSVG && imageDesktop.tracedSVG && (
              <>
                <ImgFixedOnlyMobile
                  className={placeholderClassName || ''}
                  src={imageMobile.tracedSVG}
                  {...placeholderImageProps}
                />
                <ImgFixedOnlyDesktop
                  className={placeholderClassName || ''}
                  src={imageDesktop.tracedSVG}
                  {...placeholderImageProps}
                />
              </>
            )}

            {/* Show a solid background color. */}
            {bgColor && (
              <>
                <TagFixedBk
                  title={title}
                  style={{
                    backgroundColor: bgColor,
                    opacity: !this.state.imgLoaded ? 1 : 0,
                    transitionDelay: '0.25s',
                  }}
                />
              </>
            )}

            {/* Once the image is visible, start downloading the image */}
            {this.state.isVisible && (
              <picture>
                {imageMobile.srcSetWebp && (
                  <source
                    media={`(max-width: ${breakPoint - 1}px)`}
                    type="image/webp"
                    srcSet={imageMobile.srcSetWebp}
                    sizes={imageMobile.sizes}
                  />
                )}

                <source
                  media={`(max-width: ${breakPoint - 1}px)`}
                  srcSet={imageMobile.srcSet}
                  sizes={imageDesktop.sizes}
                />

                {imageDesktop.srcSetWebp && (
                  <source
                    media={`(min-width: ${breakPoint}px)`}
                    type="image/webp"
                    srcSet={imageDesktop.srcSetWebp}
                    sizes={imageDesktop.sizes}
                  />
                )}

                <source
                  media={`(min-width: ${breakPoint}px)`}
                  srcSet={imageDesktop.srcSet}
                  sizes={imageDesktop.sizes}
                />

                <Img
                  alt={alt}
                  width={imageDesktop.width}
                  height={imageDesktop.height}
                  title={title}
                  src={imageDesktop.src}
                  style={imageStyle}
                  ref={this.imageRef}
                  onLoad={this.handleImageLoaded}
                  onError={this.props.onError}
                  itemProp={itemProp}
                />
              </picture>
            )}

            {/* Show the original image during server-side rendering if JavaScript is disabled */}
            {this.state.hasNoScript && (
              <noscript
                dangerouslySetInnerHTML={{
                  __html:
                    noscriptImgMobile({ ...imageMobile }) +
                    noscriptImgDesktop({
                      alt,
                      title,
                      width: imageDesktop.width,
                      height: imageDesktop.height,
                      ...imageDesktop,
                    }),
                }}
              />
            )}
          </Tag>
        </>
      );
    }

    return null;
  }
}

ArtImg.defaultProps = {
  critical: false,
  fadeIn: true,
  alt: '',
  breakPoint: 768,
  Tag: 'div',
};

const fixedObject = PropTypes.shape({
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  srcSet: PropTypes.string.isRequired,
  base64: PropTypes.string,
  tracedSVG: PropTypes.string,
  srcWebp: PropTypes.string,
  srcSetWebp: PropTypes.string,
});

const fluidObject = PropTypes.shape({
  aspectRatio: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  srcSet: PropTypes.string.isRequired,
  sizes: PropTypes.string.isRequired,
  base64: PropTypes.string,
  tracedSVG: PropTypes.string,
  srcWebp: PropTypes.string,
  srcSetWebp: PropTypes.string,
});

ArtImg.propTypes = {
  resolutions: fixedObject,
  sizes: fluidObject,
  fixedMobile: fixedObject,
  fixedDesktop: fixedObject,
  fluidMobile: fluidObject,
  fluidDesktop: fluidObject,
  breakPoint: PropTypes.number,
  fadeIn: PropTypes.bool,
  title: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]), // Support Glamor's css prop.
  critical: PropTypes.bool,
  style: PropTypes.object,
  imgStyle: PropTypes.object,
  placeholderStyle: PropTypes.object,
  placeholderClassName: PropTypes.string,
  backgroundColor: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  onStartLoad: PropTypes.func,
  Tag: PropTypes.string,
  itemProp: PropTypes.string,
};

export default ArtImg;
