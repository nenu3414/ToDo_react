// import React
import React from "react";
// import styled
import styled from "styled-components";

// import Navbar and SideDrawer
import Navbar from "../../components/Navigation/Navbar/Navbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

// MainWrapper
const MainWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 6rem);
  margin-top: 6rem;
`;

// Layout
const Layout = ({ children }) => (
  <>
    <Navbar />
    <SideDrawer />
    <MainWrapper>{children}</MainWrapper>
  </>
);

export default Layout;
