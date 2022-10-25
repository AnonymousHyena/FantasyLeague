import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import "./scss/volt.scss";

import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";

import HomePage from "./pages/HomePage";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <HashRouter>
    <ScrollToTop />
    <Provider store={store}>
      <HomePage />
    </Provider>
  </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
