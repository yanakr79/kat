import React, { useState } from 'react';

import Logo from '../Logo/Logo';
import Hamburger from '../Hamburger';
import LanguageSwitch from '../LanguageSwitch';
import DarkModeToggle from '../DarkModeToggle';
import { Left, Right } from './styled';
import Menu from './Menu';

import BODY_PREVENT_SCROLLING from '../../constants/body-prevent-scrolling';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const setIsMenuOpenWrap = (value) => {
    const list = document.body.classList;
    const hasClass = list.contains(BODY_PREVENT_SCROLLING);
    if (value) {
      if (!hasClass) {
        list.add(BODY_PREVENT_SCROLLING);
      }
    } else if (hasClass) {
      list.remove(BODY_PREVENT_SCROLLING);
    }
    setIsMenuOpen(value);
  };

  const toggleOpen = () => setIsMenuOpenWrap(!isMenuOpen);
  const close = () => setIsMenuOpenWrap(false);

  //    <Menu menuData={menuData} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpenWrap} />
  return (
    <>
      <Left>
        <Hamburger open={isMenuOpen} onClick={toggleOpen} />
        <Logo onClick={close} />
      </Left>
      <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpenWrap} />
      <Right>
        <LanguageSwitch onClick={close} />
        <DarkModeToggle />
      </Right>
    </>
  );
};

export default Navbar;
