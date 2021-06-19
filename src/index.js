// import React
import React from "react";
// import ReactDOM
import ReactDOM from "react-dom";
// import ThemeProvider -> themes
import { ThemeProvider } from "styled-components";
// import BrowserRouter -> Route, Switch and Redirect
import { BrowserRouter } from "react-router-dom";
// import Provider
import { Provider } from "react-redux";
// import store
import store from "./store";
// import App
import App from "./App";
// import firebase
import firebase from "./Firebase/Firebase";
// import ReactReduxFirebaseProvider
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
// import createFirestoreInstance
import { createFirestoreInstance } from "redux-firestore";

// import theme and GlobalStyles
import theme from "./utils/theme";
import GlobalStyles from "./utils/global";

// react-redux-firebase config
const rrfconfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};

const rrfProps = {
  firebase,
  config: rrfconfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

// Render ReactDOM
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <>
              <App />
              <GlobalStyles />
            </>
          </ThemeProvider>
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
