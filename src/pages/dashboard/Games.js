import React, { useState, useEffect } from "react";
import { Col, Row, Card } from "react-bootstrap";
import { connect } from "react-redux";
import SelectForm from "../../components/SelectForm";
import * as utils from "../../utils";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";

import store from "../../store";
import PointsSources from "../../components/PointsSources";
import ContestantPointsHistoryChart from "../../components/ContestantPointsHistoryChart";

const Games = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <Row className="justify-content-center">
        <Col xs={12} className="mt-1 mb-1 mt-lg-2 mb-lg-4">
          <Card
            onClick={() => {
              navigate("GNTM5/overview");
            }}
          >
            <Card.Body>GNTM 5</Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={12} className="mt-1 mb-1 mt-lg-2 mb-lg-4">
          <Card
            onClick={() => {
              navigate("Survivor/overview");
            }}
          >
            <Card.Body>Survivor</Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={12} className="mt-1 mb-1 mt-lg-2 mb-lg-4">
          <Card
            onClick={() => {
              navigate("masterChef/overview");
            }}
          >
            <Card.Body>Master Chef</Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = function (state) {
  return {
    data: state.data,
    contestant: state.contestant,
  };
};

export default connect(mapStateToProps)(Games);
