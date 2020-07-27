import React from 'react';
import { Global, css } from '@emotion/core';

import sizes from '../../gatsby-plugin-theme-ui/sizes';
import mq from '../../gatsby-plugin-theme-ui/media-queries';
import colors from '../../gatsby-plugin-theme-ui/colors';
import { breakpoints } from '../../gatsby-plugin-theme-ui/breakpoints';

import BODY_PREVENT_SCROLLING from '../../constants/body-prevent-scrolling';

const GlobalStyle = () => (
  <Global
    styles={css`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      html,
      body {
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeSpeed;
        margin: 0;
        padding: 0;
        overflow-wrap: break-word;
        word-wrap: break-word;
      }

      html {
        scroll-padding-top: calc(${sizes.header[0]} + 1.5rem);
        ${mq.lg} {
          scroll-padding-top: calc(${sizes.header[3]} + 1.5rem);
        }
      }

      a,
      abbr,
      acronym,
      address,
      applet,
      article,
      aside,
      audio,
      b,
      big,
      blockquote,
      body,
      canvas,
      caption,
      center,
      cite,
      code,
      dd,
      del,
      details,
      dfn,
      div,
      dl,
      dt,
      em,
      embed,
      fieldset,
      figcaption,
      figure,
      footer,
      form,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      header,
      hgroup,
      html,
      i,
      iframe,
      img,
      ins,
      kbd,
      label,
      legend,
      li,
      mark,
      menu,
      nav,
      object,
      ol,
      output,
      p,
      pre,
      q,
      ruby,
      s,
      samp,
      section,
      small,
      span,
      strike,
      strong,
      sub,
      summary,
      sup,
      table,
      tbody,
      td,
      tfoot,
      th,
      thead,
      time,
      tr,
      tt,
      u,
      ul,
      var,
      video {
        margin: 0;
        padding: 0;
        border: 0;
        vertical-align: baseline;
      }

      article,
      aside,
      footer,
      header,
      main,
      nav,
      section {
        display: block;
      }

      ol,
      ul {
        list-style-type: none;
        -webkit-padding-start: 0;
      }

      a,
      button {
        cursor: pointer;
      }

      a {
        color: inherit;
        background-color: transparent;
        -webkit-text-decoration-skip: objects;
      }

      /* SHARED */
      *:focus {
        /* outline: 1px solid #3740ff; */
        outline: none;
      }

      /* LINKS */
      a,
      :link,
      :visited {
        /* color: ${colors.text}; */
        text-decoration: none;
      }

      a:active,
      :link:focus,
      :link:active,
      :visited:focus,
      :visited:active {
        /* outline: 1px solid #3740ff; */
        outline: none;
      }

      a:focus,
      a:active,
      a:hover,
      :link:focus,
      :link:active,
      :link:hover,
      :visited:focus,
      :visited:active,
      :visited:hover {
        /* text-decoration: underline; */
        text-decoration: none;
      }

      a:hover: {
        color: ${colors.highlight};
      }

      /* BUTTONS */
      button {
        min-width: 2rem;
      }

      @media (max-width: ${breakpoints.lg}) {
        .${BODY_PREVENT_SCROLLING} {
          height: 100%;
          position: fixed;
        }
      }
    `}
  />
);

export default GlobalStyle;
