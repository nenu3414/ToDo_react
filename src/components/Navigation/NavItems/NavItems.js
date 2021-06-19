// import React
import React from "react";
// import styled
import styled from "styled-components";
// import navitem
import NavItem from "./NavItem/NavItem";

// Nav
const Nav = styled.nav`
  display: flex;
  margin-top: ${(props) => (props.mobile ? "-6rem" : null)};
`;

// Ul
const Ul = styled.nav`
  display: flex;
  flex-direction: ${(props) => (props.mobile ? "column" : "row")};
  align-items: center;
  height: 100%;
`;

// Navitems
const NavItems = ({ mobile, clicked }) => {
  return (
    <Nav mobile={mobile}>
      <Ul mobile={mobile}>
        <NavItem clicked={clicked} mobile={mobile} link="/">
          Home
        </NavItem>
        <NavItem mobile={mobile} clicked={clicked} link="/todos">
          Todos
        </NavItem>
      </Ul>
    </Nav>
  );
};

export default NavItems;
