/** @jsx jsx */
import { jsx } from 'theme-ui';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Location } from '@reach/router';
import { Link } from 'gatsby';

import { localizePath, i18nEnabled, locales, localeCodes } from '../../i18n/i18n';
import { useLocale } from '../../i18n/i18n-context';

const wrapStyle = {
  display: 'inline-flex',
};
const itemWrapStyle = {
  '&::after': {
    content: '"|"',
    mx: '0.4rem',
  },
  ':last-child': {
    '&::after': {
      content: '""',
      mx: 0,
    },
  },
};

const itemStyle = {
  color: (t) => t.colors.header.text,
  textTransform: 'uppercase',
  '&:active, &:focus, &:hover': {
    outline: 'none',
    textDecoration: 'none',
  },
  '&:hover': {
    color: (t) => t.colors.highlight,
  },
};

const activeItemStyle = {
  color: (t) => t.colors.header.nav.languageSwitch.selected,
};

const nonActiveItemStyle = {};

const LanguageSwitch = ({ onClick }) => {
  const { currentLocale } = useLocale();

  if (!i18nEnabled) {
    return null;
  }

  const toPage = (p) => {
    const n = p.length;
    if (n <= 3) {
      return '';
    }
    return p
      .split(/\/[a-z]{2}\//)
      .pop()
      .replace(/^\/+/, '');
  };

  return (
    <Location>
      {({ location: { pathname } }) => (
        <div sx={wrapStyle}>
          {localeCodes.map((code) => {
            const { shortName, shortLocalName } = locales[code];
            const isCurrent = currentLocale === code;
            return (
              <div key={code} sx={itemWrapStyle}>
                <Link
                  sx={{
                    ...itemStyle,
                    ...(isCurrent ? activeItemStyle : nonActiveItemStyle),
                  }}
                  to={localizePath(`/${toPage(pathname)}`, code)}
                  onClick={onClick}
                >
                  {isCurrent ? shortLocalName : shortName}
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </Location>
  );
};

export default LanguageSwitch;
