// import React and useState
import React, { useState } from "react";
// import styled
import styled from "styled-components";

// import Logo, Navitems, Hamburger
import Logo from "../../Logo/Logo";
import NavItems from "../NavItems/NavItems";
import Hamburger from "./Hamburger/Hamburger";

// FixedWrapper
const FixedWrapper = styled.header`
  position: fixed;
  background-color: var(--color-mainDark);
  padding: 0rem 2rem;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 6rem;
  display: none;

  @media ${(props) => props.theme.mediaQueries.smallest} {
    display: flex;
  }
`;

// Wrapper
const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

// Menu
const Menu = styled.div`
  width: 100%;
  background-color: var(--color-mainDark);
  height: 100vh;
  margin-top: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: ${(props) => (props.opened ? "visible" : "hidden")};
  transform: translateY(${(props) => (props.opened ? "0%" : "-100%")});
  transition: all 0.1s cubic-bezier(0.445, 0.05, 0.55, 0.95);
  position: fixed;
  top: 0;
  left: 0;
  display: none;

  @media ${(props) => props.theme.mediaQueries.smallest} {
    display: flex;
  }
`;

// SideDrawer
const SideDrawer = () => {
  // useState hook
  const [isOpened, setIsOpened] = useState(false);
  return (
    <>
      <FixedWrapper>
        <Wrapper>
          <Logo />
          <Hamburger opened={isOpened} clicked={() => setIsOpened(!isOpened)} />
        </Wrapper>
      </FixedWrapper>
      <Menu opened={isOpened}>
        <NavItems mobile clicked={() => setIsOpened(false)} />
      </Menu>
    </>
  );
};

export default SideDrawer;
