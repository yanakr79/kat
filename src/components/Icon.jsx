/* eslint-disable import/no-duplicates */
import React from 'react';

// import { FaFacebookF } from 'react-icons/fa';
// import { FaInstagram } from 'react-icons/fa';
import { FaLink } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa';
// import { FaTelegram } from 'react-icons/fa';
// import { FaWhatsapp } from 'react-icons/fa';
// import { FaViber } from 'react-icons/fa';
// import { FaSkype } from 'react-icons/fa';

const icons = {
  // facebook: <FaFacebookF />,
  // instagram: <FaInstagram />,
  link: <FaLink />,
  phone: <FaPhone />,
  envelope: <FaEnvelope />,
  // whatsapp: <FaWhatsapp />,
  // telegram: <FaTelegram />,
  // viber: <FaViber />,
  // skype: <FaSkype />,
};

const Icon = ({ iconName }) => {
  if (!iconName) {
    return null;
  }
  return icons[iconName] || `Pls, provide icon ${iconName}`;
};

export default Icon;
