// import React
import React from "react";
// import ReactDOM
import ReactDOM from "react-dom";
// import ThemeProvider -> themes
import { ThemeProvider } from "styled-components";
// import BrowserRouter -> Route, Switch and Redirect
import { BrowserRouter } from "react-router-dom";
// import App
import App from "./App";

// import theme and GlobalStyles
import theme from "./utils/theme";
import GlobalStyles from "./utils/global";

// Render ReactDOM
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <>
          <App />
          <GlobalStyles />
        </>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
