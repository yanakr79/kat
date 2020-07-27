const siteUrl = 'https://www.example.com'; // No trailing slash!

module.exports = {
  /* Meta */
  siteUrl,

  /* Schema org */
  siteBusinessPhoto: `${siteUrl}/assets/business-photo.jpg`,
  siteLogo: `${siteUrl}/assets/logo.svg`,

  /* Open Graph Image */
  ogImage: {
    src: `${siteUrl}/assets/og-banner-`,
    width: 1200,
    height: 630,
  },

  /* Twitter Image */
  twitterImage: {
    src: `${siteUrl}/assets/twitter-banner-2x1-`,
    width: 600,
    height: 300,
  },

  fbAppID: '',
  /* Twitter Url */
  twitterSite: '',
  /* Twitter Id */
  twitterCreator: '',

  googleAnalyticsID: 'XXXXXX',

  // Manifest
  themeColor: '#3498DB',
  backgroundColor: '#2e3246',
};
