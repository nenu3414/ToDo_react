// import React
import React from "react";
// import Route, Switch and Redirect
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// import Layout, Home, Todos and Login
import Layout from "./hoc/Layout/Layout";
//import Home from "./containers/Home/Home";
import Todos from "./containers/Todos/Todos";
import Login from "./containers/Auth/Login/Login";
import SignUp from "./containers/Auth/SignUp/SignUp";
import Logout from "./containers/Auth/Logout/Logout";
import VerifyEmail from "./containers/Auth/VerifyEmail/VerifyEmail";
import RecoverPassword from "./containers/Auth/RecoverPassword/RecoverPassword";

// App
function App({ loggedIn, emailVerified }) {
  let routes;
  if (loggedIn && !emailVerified) {
    routes = (
      <Switch>
        <Route exact path="/verify-email" component={VerifyEmail}></Route>
        <Route exact path="/logout" component={Logout}></Route>
        <Redirect to="/verify-email" />
      </Switch>
    );
  } else if (loggedIn && emailVerified) {
    routes = (
      <Switch>
        <Route exact path="/" component={Todos}></Route>
        <Route exact path="/logout" component={Logout}></Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/signup" component={SignUp}></Route>
        <Route exact path="/recover" component={RecoverPassword}></Route>
        <Redirect to="/login" />
      </Switch>
    );
  }

  return <Layout>{routes}</Layout>;
}

const mapStateToProps = ({ firebase }) => ({
  loggedIn: firebase.auth.uid,
  emailVerified: firebase.auth.emailVerified,
});

export default connect(mapStateToProps)(App);
