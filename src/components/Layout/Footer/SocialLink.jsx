/** @jsx jsx */
import { jsx } from 'theme-ui';

const style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'footer.text',
  textDecoration: 'none',
  height: '2rem',
  width: '2rem',
  margin: '0 0.625rem',
  border: '0.125rem solid',
  borderColor: 'footer.text',
  borderRadius: '100%',

  ':hover': {
    // color: 'footer.text',
    backgroundColor: 'footer.highlight',
    border: '0.125rem solid transparent',
    transition: 'all 0.4s ease-out 0s',
  },
};

const SocialLink = ({ icon, name, text, url }) => (
  <a sx={style} href={url} target="_blank" rel="noreferrer" aria-label={name} title={text}>
    {icon}
  </a>
);

export default SocialLink;
