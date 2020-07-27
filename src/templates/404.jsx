/** @jsx jsx */
import { jsx, Heading } from 'theme-ui';
import SEO from '../components/SEO';

import i18n from '../i18n';
import Layout from '../components/Layout';

import Container from '../components/Container';

const PAGE_TITLE = '404';
const translations = {
  en: {
    metaDescription: 'Page Not Found',
    text: "Sorry, we couldn't find that page.",
  },
  ru: {
    metaDescription: 'Страница не найдена',
    text: 'Сожалеем, запрашиваемая вами страница не найдена.',
  },
  uk: {
    metaDescription: 'Сторінку не знайдено',
    text: 'Шкодуємо, запитувана вами сторінка не знайдена.',
  },
};

const Hero = () => (
  <Container sx={{ textAlign: 'center', my: 8 }}>
    <Heading as="h1" sx={{ fontFamily: 'monospace', fontSize: 12 }}>
      {PAGE_TITLE}
    </Heading>
  </Container>
);

const NotFoundTemplate = ({ location }) => {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const locale = i18n.langFromPath(pathname);
  const { metaDescription, text } = translations[locale];
  return (
    <Layout hero={<Hero title={PAGE_TITLE} />}>
      <SEO
        locale={locale}
        title={PAGE_TITLE}
        description={metaDescription}
        pathname={location.pathname}
        noindex
      />
      <div sx={{ textAlign: 'center' }}>{text}</div>
    </Layout>
  );
};

export default NotFoundTemplate;
