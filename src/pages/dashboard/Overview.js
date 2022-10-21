import React, { useEffect } from "react";
import { Col, Row } from "@themesberg/react-bootstrap";
import { connect } from "react-redux";

import TeamRankings from "../../components/TeamRankings";

const Overview = (props) => {
  useEffect(() => {}, [props.data]);

  return (
    <>
      <Row className="justify-content-md-center">
        <Col xs={12} className="mt-2 mb-4 d-none d-sm-block">
          <TeamRankings />
        </Col>
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
