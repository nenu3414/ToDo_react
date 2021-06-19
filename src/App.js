// import React
import React from "react";
// import Route, Switch and Redirect
import { Route, Switch, Redirect } from "react-router-dom";

// import Layout, Home and Todos
import Layout from "./hoc/Layout/Layout";
import Home from "./containers/Home/Home";
import Todos from "./containers/Todos/Todos";

// App
function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/todos" component={Todos}></Route>
        <Redirect to="/" />
      </Switch>
    </Layout>
  );
}

export default App;
