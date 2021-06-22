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
const NavItems = ({ mobile, clicked, loggedIn }) => {
  let links;
  if (loggedIn.uid) {
    links = (
      <Ul mobile={mobile}>
        <NavItem mobile={mobile} clicked={clicked} link="/todos">
          Todos
        </NavItem>
        <NavItem mobile={mobile} clicked={clicked} link="/logout">
          Logout
        </NavItem>
      </Ul>
    );
  } else {
    links = (
      <Ul mobile={mobile}>
        <NavItem mobile={mobile} clicked={clicked} link="/login">
          Login
        </NavItem>
        <NavItem mobile={mobile} clicked={clicked} link="/signup">
          SignUp
        </NavItem>
      </Ul>
    );
  }

  return <Nav mobile={mobile}>{links}</Nav>;
};

export default NavItems;
