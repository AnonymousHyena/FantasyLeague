import React from "react";
import { Col, Row, Card } from "react-bootstrap";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
            <Card.Body>
              <table className="w-50">
                <tr>
                  <td>GNTM 5</td>
                  <td>
                    <FontAwesomeIcon icon={faCrown} /> Φρυδερίκη αγάπη μου{" "}
                    <FontAwesomeIcon icon={faCrown} />
                  </td>
                </tr>
              </table>
            </Card.Body>
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
