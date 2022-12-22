import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navbar, Container, Button } from "react-bootstrap";
import { initializeDataAndStore } from "../utils";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const NavigationBar = (props) => {
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    const prefix = pathname.split("/")[2];

    initializeDataAndStore(prefix);
  }, []);

  return (
    <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0 mb-3">
      <Container fluid className="px-0" style={{ flexWrap: "wrap" }}>
        <Button
          as={Link}
          variant="primary"
          className="animate-hover d-none d-lg-block"
          to={"/FantasyLeague"}
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="animate-left-3 me-3 ms-2"
          />
          Go back to games
        </Button>
      </Container>
    </Navbar>
  );
};

const mapStateToProps = function (state) {
  return {
    data: state.data,
  };
};

export default connect(mapStateToProps)(NavigationBar);
