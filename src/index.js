// import React
import React from "react";
// import ReactDOM
import ReactDOM from "react-dom";
// import ThemeProvider -> themes
import { ThemeProvider } from "styled-components";
// import BrowserRouter -> Route, Switch and Redirect
import { BrowserRouter } from "react-router-dom";
// import Provider
import { Provider, useSelector } from "react-redux";
// import store
import store from "./store";
// import App
import App from "./App";
// import firebase
import firebase from "./Firebase/Firebase";
// import ReactReduxFirebaseProvider
import { ReactReduxFirebaseProvider, isLoaded } from "react-redux-firebase";
// import createFirestoreInstance
import { createFirestoreInstance } from "redux-firestore";
import Loader from "./components/UI/Loader/Loader";
import styled from "styled-components";

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

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const root = document.getElementById("root");

function AuthIsLoaded({ children }) {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth))
    return (
      <ThemeProvider theme={theme}>
        <>
          <Wrapper>
            <Loader />
          </Wrapper>
          <GlobalStyles />
        </>
      </ThemeProvider>
    );
  return children;
}

// Render ReactDOM
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <>
              <AuthIsLoaded>
                <App />
                <GlobalStyles />
              </AuthIsLoaded>
            </>
          </ThemeProvider>
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  root
);
