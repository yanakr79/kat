import React from 'react';
import { Helmet } from 'react-helmet';

import useSocialLinks from '../../hooks/useSocialLinks';
import config from '../../../config/website';
import { useLocale } from '../../i18n/i18n-context';

import i18n, { useTranslation } from '../../i18n';

const removeTrailingSlash = (s) => s.replace(/\/$/, '');

const SEO = ({ title, description, locale, pathname, canonical, noindex = false, metas = [] }) => {
  const socialLinks = useSocialLinks();
  const { address, organization } = useLocale();
  const { t } = useTranslation();

  const article = false;
  const isBlog = false;

  const URL = `${config.siteUrl}${removeTrailingSlash(pathname)}`;
  const homeURL = `${config.siteUrl}${i18n.localizePath('/', locale)}`;

  const purePath = i18n.purePath(pathname);

  const ogImage = { ...config.ogImage, src: `${config.ogImage.src}${locale}.jpg` };
  const twitterImage = { ...config.twitterImage, src: `${config.twitterImage.src}${locale}.jpg` };

  const { legalName, postalAddress } = address;
  const { streetAddress, addressLocality, postalCode, addressCountry } = postalAddress;

  const schemaOrg = {
    '@context': 'http://schema.org',
    '@type': 'Organization',
    legalName,
    address: {
      '@type': 'PostalAddress',
      addressCountry,
      addressLocality,
      postalCode,
      streetAddress: streetAddress.join(', '),
    },
    name: i18n.locales[locale].siteTitle,
    alternateName: i18n.locales[locale].siteTitleAlt,
    description: i18n.locales[locale].siteDescription,
    url: homeURL,
    email: organization.email ? organization.email.join() : null,
    telephone:
      organization.voice && organization.voice.phone ? organization.voice.phone.join() : null,
    image: config.siteBusinessPhoto,
    logo: config.siteLogo,
  };
  if (Object.keys(socialLinks).length) {
    schemaOrg.sameAs = Object.keys(socialLinks).map((key) => socialLinks[key].url);
  }
  if (organization.openingHours && Array.isArray(organization.openingHours)) {
    schemaOrg.openingHours = organization.openingHours.reduce(
      (acc, [dow, timeStart, timeFinish]) =>
        `${acc}${acc ? ', ' : ''}${t(`dow.d2.${dow}`)}: ${timeStart}-${timeFinish}`,
      '',
    );
  }
  const schemaWebPage = {
    '@context': 'http://schema.org',
    '@type': isBlog ? 'Blog' : 'WebPage',
    url: URL,
    headline: i18n.locales[locale].siteHeadline,
    inLanguage: i18n.locales[locale].htmlLang,
    mainEntityOfPage: URL,
    description: i18n.locales[locale].siteDescription,
    name: i18n.locales[locale].siteTitle,
    image: {
      '@type': 'ImageObject',
      url: ogImage.src,
    },
  };

  return (
    <Helmet>
      <html lang={i18n.locales[locale].htmlLang} />
      {noindex && <meta name="robots" content="noindex" />}
      <title>{title}</title>

      {i18n.localeCodes.map((code) => (
        <link
          key={code}
          rel="alternate"
          hrefLang={code}
          href={`${config.siteUrl}${i18n.localizePath(purePath, code)}`}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${config.siteUrl}${i18n.localizePath(purePath, i18n.defaultLang)}`}
      />
      <meta httpEquiv="content-language" content={locale} />

      <meta name="description" content={description} />
      {canonical && pathname && <link rel="canonical" href={pathname} />}
      <meta name="theme-color" content={config.themeColor} />

      {metas &&
        Object.keys(metas).map((name) => <meta key={name} name={name} content={metas[name]} />)}

      {config.fbAppID && <meta property="fb:app_id" content={config.fbAppID} />}

      <meta property="og:locale" content={i18n.locales[locale].ogLocale} />
      {i18n.localeCodes
        .filter((code) => code !== locale)
        .map((code) => (
          <meta key={code} property="og:locale:alternate" content={i18n.locales[code].ogLocale} />
        ))}
      {socialLinks.facebook && <meta property="og:site_name" content={socialLinks.facebook.url} />}
      <meta property="og:url" content={URL} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage.src} />
      <meta property="og:image:alt" content={description} />
      <meta property="og:image:width" content={ogImage.width} />
      <meta property="og:image:height" content={ogImage.height} />
      {Object.keys(socialLinks).map((key) => (
        <meta key={key} property="og:see_also" content={socialLinks[key].url} />
      ))}

      <meta name="twitter:card" content="summary_large_image" />
      {(config.twitterCreator || config.twitterSite) && (
        <>
          <meta name="twitter:site" content={config.twitterSite || config.twitterCreator} />
          <meta name="twitter:creator" content={config.twitterCreator || config.twitterSite} />
        </>
      )}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={twitterImage.src} />
      <meta name="twitter:image:alt" content={description} />
      <meta name="twitter:image:width" content={twitterImage.width} />
      <meta name="twitter:image:height" content={twitterImage.height} />

      <link type="text/plain" href={`${config.siteUrl}/humans.txt`} rel="author" />

      <script type="application/ld+json">{JSON.stringify(schemaWebPage)}</script>
      <script type="application/ld+json">{JSON.stringify(schemaOrg)}</script>
    </Helmet>
  );
};

export default SEO;
