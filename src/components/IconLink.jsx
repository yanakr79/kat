/* eslint-disable react/jsx-props-no-spreading */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import Obfuscate from 'react-obfuscate';

import Icon from './Icon';

const styleSpacer = {
  display: 'inline-block',
  width: '1em',
};

const style = { pl: '0.4em' };

const IconLink = ({ children, to, icon, title, obfuscate, extraStyle, ...props }) => {
  let extra;
  if (obfuscate) {
    if (to.includes('mailto:')) {
      extra = { email: to.replace('mailto:', '') };
    }
  }
  return (
    <div
      sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', ...(extraStyle || {}) }}
      title={title}
    >
      {icon && <Icon iconName={icon} />}
      {!icon && <div sx={styleSpacer} />}
      {to &&
        (extra ? (
          <Obfuscate sx={style} {...{ ...props, ...extra }}>
            {children}
          </Obfuscate>
        ) : (
          <a sx={style} href={to} {...props}>
            {children}
          </a>
        ))}
      {!to && (
        <span sx={style} {...props}>
          {children}
        </span>
      )}
    </div>
  );
};

export default IconLink;
