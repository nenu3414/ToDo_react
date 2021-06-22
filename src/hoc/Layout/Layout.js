// import React
import React from "react";
// import styled
import styled from "styled-components";
import { connect } from "react-redux";

// import Navbar and SideDrawer
import Navbar from "../../components/Navigation/Navbar/Navbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

// MainWrapper
const MainWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 6rem);
  margin-top: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Layout
const Layout = ({ children, loggedIn }) => (
  <>
    <Navbar loggedIn={loggedIn} />
    <SideDrawer loggedIn={loggedIn} />
    <MainWrapper>{children}</MainWrapper>
  </>
);

const mapStateToProps = ({ firebase }) => ({
  loggedIn: firebase.auth,
});

export default connect(mapStateToProps)(Layout);
