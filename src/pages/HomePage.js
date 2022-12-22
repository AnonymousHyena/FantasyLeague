import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { AppRoutes } from "../routes";

// pages
import Games from "./dashboard/Games";
import Overview from "./dashboard/Overview";
import Teams from "./dashboard/Teams";
import Contestants from "./dashboard/Contestants";
import Episodes from "./dashboard/Episodes";

import Rules from "./Rules";

import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Preloader show={loaded ? false : true} /> <Component {...Component} />{" "}
    </>
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem("settingsVisible") === "false" ? false : true;
  };

  const [showSettings, setShowSettings] = useState(
    localStorageIsSettingsVisible
  );

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem("settingsVisible", !showSettings);
  };

  return (
    <>
      <Preloader show={loaded ? false : true} />
      <Sidebar />

      <main className="content">
        <Navbar />
        <Component {...Component} />
        <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
      </main>
    </>
  );
};

export default () => (
  <Routes>
    <Route
      exact
      path={AppRoutes.NotFound.path}
      element={<RouteWithLoader component={ServerError} />}
    />
    <Route
      exact
      path={AppRoutes.Games.path}
      element={<RouteWithLoader component={Games} />}
    />

    {/* GNTM pages */}
    <Route
      exact
      path={"GNTM5" + AppRoutes.Overview.path}
      element={<RouteWithSidebar component={Overview} />}
    />

    <Route
      exact
      path={"GNTM5" + AppRoutes.Teams.path}
      element={<RouteWithSidebar component={Teams} />}
    />
    <Route
      exact
      path={"GNTM5" + AppRoutes.Contestants.path}
      element={<RouteWithSidebar component={Contestants} />}
    />

    <Route
      exact
      path={"GNTM5" + AppRoutes.Episodes.path}
      element={<RouteWithSidebar component={Episodes} />}
    />
    <Route
      exact
      path={"GNTM5" + AppRoutes.Rules.path}
      element={<RouteWithSidebar component={Rules} />}
    />

    {/* Survivor pages */}
    <Route
      exact
      path={"survivor" + AppRoutes.Overview.path}
      element={<RouteWithSidebar component={Overview} />}
    />

    <Route
      exact
      path={"survivor" + AppRoutes.Teams.path}
      element={<RouteWithSidebar component={Teams} />}
    />
    <Route
      exact
      path={"survivor" + AppRoutes.Contestants.path}
      element={<RouteWithSidebar component={Contestants} />}
    />

    <Route
      exact
      path={"survivor" + AppRoutes.Episodes.path}
      element={<RouteWithSidebar component={Episodes} />}
    />
    <Route
      exact
      path={"survivor" + AppRoutes.Rules.path}
      element={<RouteWithSidebar component={Rules} />}
    />
    {/* pages */}

    <Route path="*" element={<RouteWithLoader component={NotFoundPage} />} />

    {/* <Navigate to={AppRoutes.NotFound.path} /> */}
  </Routes>
);
