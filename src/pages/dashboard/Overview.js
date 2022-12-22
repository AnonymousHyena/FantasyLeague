import React from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";

import TeamRankings from "../../components/TeamRankings";
import AllTeamPoints from "../../components/AllTeamPoints";
import AllTeamPointsCompact from "../../components/AllTeamPointsCompact";
import ContestantRankings from "../../components/ContestantRankings";
import ContestantRankingsCompact from "../../components/ContestantRankingsCompact";
import TeamsProgress from "../../components/TeamsProgress";

const Overview = (props) => {
  return (
    <>
      <Row className="justify-content-md-center">
        <Col xs={12} className="mt-1 mb-1 mt-lg-2 mb-lg-4 d-block d-sm-block">
          <TeamRankings />
        </Col>
      </Row>

      <Row className="justify-content-lg-center d-none d-lg-block">
        <Col xs={12} className="mt-1 mb-1 mt-lg-2 mb-lg-4">
          <AllTeamPoints />
        </Col>
      </Row>

      <Row className="justify-content-lg-center d-block">
        <Col xs={12} className="mt-1 mb-1 mt-lg-2 mb-lg-4">
          <TeamsProgress />
        </Col>
      </Row>

      <Row className="justify-content-lg-center d-block d-lg-none">
        <Col xs={12} className="mt-1 mb-1 mt-lg-2 mb-lg-4">
          <AllTeamPointsCompact />
        </Col>
      </Row>

      <Row className="justify-content-md-center d-none d-lg-block">
        <ContestantRankings />
      </Row>

      <Row className="justify-content-md-center d-block d-lg-none">
        <ContestantRankingsCompact />
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
