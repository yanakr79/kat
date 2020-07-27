/* eslint-disable react/jsx-props-no-spreading */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';
import Link from '../LocalizedLink';

import colors from '../../gatsby-plugin-theme-ui/colors';

const focusStyle = {
  outline: 0,
  boxShadow: `0 0 0 2px ${colors.input.focusBoxShadow}`,
};

export const buttonStyles = () => {
  return {
    default: {
      alignItems: 'center',
      backgroundColor: 'button.primaryBg',
      borderRadius: 1,
      borderWidth: 0,
      borderStyle: 'solid',
      borderColor: 'button.primaryBorder',
      color: 'button.primaryText',
      cursor: 'pointer',
      display: 'inline-flex',
      fontFamily: 'heading',
      fontWeight: 'semibold',
      fontSize: 2,
      flexShrink: 0,
      // lineHeight: 'solid',
      textDecoration: 'none',
      whiteSpace: 'nowrap',
      px: 3,
      height: '3.5rem',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      backgroundSize: (t) => `${t.space[7]} ${t.space[7]}`,
      transition: (t) => `background-color color outline border-color ${t.transition.default}`,
      ':hover, :focus': {
        backgroundColor: 'brand.secondDark',
        outline: 'none',

        color: colors.white,

        borderColor: 'brand.secondDark',
      },
      ':focus': { ...focusStyle, outline: 'none' },
      ':after': { content: '""', display: 'block' },
      '& svg': { marginLeft: '.2em' },
      ':active': { outline: 'none' },
    },
    secondary: {
      borderColor: 'button.secondaryBorder',
      backgroundColor: 'button.secondaryBg',
      color: 'button.secondaryText',
      // fontWeight: 'semibold',
    },
  };
};

const components = {
  // link: Link,
  link: ({ children, ...rest }) => <Link {...rest}>{children}</Link>,
  href: ({ children, ...rest }) => <a {...rest}>{children}</a>,
  // eslint-disable-next-line react/button-has-type
  button: ({ children, ...rest }) => <button {...rest}>{children}</button>,
};

const Button = ({
  to,
  overrideCSS,
  icon,
  children,
  tag,
  secondary,
  tracking,
  variant,
  ...rest
}) => {
  const Tag = components[tag || 'button'];

  const props = {
    to: tag === 'link' ? to : undefined,
    href: tag === 'href' ? to : undefined,
    ...rest,
  };

  const trackingOnClick = (e) => {
    if (typeof props.onClick === 'function') {
      props.onClick(e);
    }

    let redirect = true;

    // Slightly modified logic from the gatsby-plugin-google-analytics
    // But this one should work with 'Link' component as well
    if (e.button !== 0 || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey || e.defaultPrevented) {
      redirect = false;
    }

    if (props.target && props.target.toLowerCase() !== '_self') {
      redirect = false;
    }

    if (tracking && window.ga) {
      window.ga('send', 'event', {
        eventCategory: 'Outbound Link',
        eventAction: 'click',
        eventLabel: `${tracking} - ${props.to || props.href}`,
        transport: redirect ? 'beacon' : '',
      });
    }
  };

  return (
    <Tag
      {...props}
      onClick={trackingOnClick}
      sx={{
        '&&': {
          ...buttonStyles().default,
          ...(secondary && buttonStyles().secondary),
          variant: `buttons.${variant}`,
          ...overrideCSS,
        },
      }}
    >
      {children}
      {icon && <React.Fragment>{icon}</React.Fragment>}
    </Tag>
  );
};

export default Button;
