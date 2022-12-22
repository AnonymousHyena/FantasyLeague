import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";

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
