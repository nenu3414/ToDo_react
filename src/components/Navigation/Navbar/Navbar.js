// import React
import React from "react";
// import styled
import styled from "styled-components";

// import Logo, Container, Navitems
import Logo from "../../Logo/Logo";
import { Container } from "../../../hoc/Layout/elements";
import NavItems from "../NavItems/NavItems";

// FixedWrapper
const FixedWrapper = styled.header`
  position: fixed;
  background-color: var(--color-mainDark);
  padding: 0rem 2rem;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 6rem;

  @media ${(props) => props.theme.mediaQueries.smallest} {
    display: none;
  }
`;

// Wrapper
const Wrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-between;
`;

//Navbar
const Navbar = ({ loggedIn }) => {
  return (
    <FixedWrapper>
      <Container>
        <Wrapper>
          <Logo />
          <NavItems loggedIn={loggedIn} />
        </Wrapper>
      </Container>
    </FixedWrapper>
  );
};

export default Navbar;
