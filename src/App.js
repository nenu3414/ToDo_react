// import React
import React from "react";
// import Route, Switch and Redirect
import { Route, Switch, Redirect } from "react-router-dom";

// import Layout, Home, Todos and Login
import Layout from "./hoc/Layout/Layout";
import Home from "./containers/Home/Home";
import Todos from "./containers/Todos/Todos";
import Login from "./containers/Auth/Login/Login";
import SignUp from "./containers/Auth/SignUp/SignUp";

// App
function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/todos" component={Todos}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/signup" component={SignUp}></Route>
        <Redirect to="/" />
      </Switch>
    </Layout>
  );
}

export default App;
