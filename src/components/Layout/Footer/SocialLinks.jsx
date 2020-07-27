/** @jsx jsx */
import { jsx } from 'theme-ui';

import SocialLink from './SocialLink';
import Utils from '../../../lib/utils';
import useSocialLinks from '../../../hooks/useSocialLinks';

import Icon from '../../Icon';

const wrapStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  py: '1rem',
  mb: '2rem',
  width: '100%',
};

const SocialLinks = () => {
  const socialLinks = useSocialLinks();
  if (Object.keys(socialLinks).length === 0) {
    return null;
  }

  return (
    <div sx={wrapStyle}>
      {Object.keys(socialLinks).map((key) => (
        <SocialLink
          key={key}
          icon={<Icon iconName={key} />}
          name={Utils.upperFirst(key)}
          url={socialLinks[key].url}
          text={socialLinks[key].text}
        />
      ))}
    </div>
  );
};

export default SocialLinks;
