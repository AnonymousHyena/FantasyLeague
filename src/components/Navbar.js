import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navbar, Container } from "@themesberg/react-bootstrap";
import { initializeDataAndStore } from "../utils";

const NavigationBar = (props) => {
  useEffect(() => {
    initializeDataAndStore();
  }, []);

  return (
    <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0 mb-3">
      <Container
        fluid
        className="px-0"
        style={{ flexWrap: "wrap" }}
      ></Container>
    </Navbar>
  );
};

const mapStateToProps = function (state) {
  return {};
};

export default connect(mapStateToProps)(NavigationBar);
