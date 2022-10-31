import React from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";

import TeamRankings from "../../components/TeamRankings";
import AllTeamPoints from "../../components/AllTeamPoints";
import ModelRankings from "../../components/ModelRankings";

const Overview = (props) => {
  return (
    <>
      <Row className="justify-content-md-center">
        <Col xs={12} className="mt-2 mb-4 d-block d-sm-block">
          <TeamRankings />
        </Col>
      </Row>

      <Row className="justify-content-lg-center d-none d-lg-block">
        <Col xs={12} className="mt-2 mb-4">
          <AllTeamPoints />
        </Col>
      </Row>

      <Row className="justify-content-md-center d-block">
        <ModelRankings />
      </Row>
    </>
  );
};

const mapStateToProps = function (state) {
  return {
    data: state.data,
  };
};

export default connect(mapStateToProps)(Overview);
