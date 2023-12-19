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
        <Col xs={10} sm={8} lg={4} xl={3} className="mt-1 mb-1 mt-lg-2 mb-lg-4">
          <Card
            onClick={() => {
              navigate("GNTM5/overview");
            }}
          >
            <Card.Header>GNTM 5</Card.Header>
            <Card.Body>
              <table className="w-100">
                <tr>
                  <td>Winner</td>
                  <td>
                    <FontAwesomeIcon icon={faCrown} /> Φρυδερίκη αγάπη μου{" "}
                    <FontAwesomeIcon icon={faCrown} />
                  </td>
                </tr>
                <tr>
                  <td>Players</td>
                  <td>Geo, Snouf, Statics, Tsamis</td>
                </tr>
                <tr>
                  <td>Dates</td>
                  <td>19/09/22 – 23/12/22</td>
                </tr>
              </table>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={10} sm={8} lg={4} xl={3} className="mt-1 mb-1 mt-lg-2 mb-lg-4">
          <Card
            onClick={() => {
              navigate("Survivor/overview");
            }}
          >
            <Card.Header>Survivor 5</Card.Header>
            <Card.Body>             
              <table className="w-100">
              <tr>Discontinued</tr>
              <tr>
                <td>Players</td>
                <td>Geo, Snouf, Statics, Tsamis</td>
              </tr>
              <tr>
                <td>Dates</td>
                <td>10/06/22 – 18/07/22</td>
              </tr></table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={10} sm={8} lg={4} xl={3} className="mt-1 mb-1 mt-lg-2 mb-lg-4">
          <Card
            onClick={() => {
              navigate("MasterChef/overview");
            }}
          >
            <Card.Header>Master Chef</Card.Header>
            <Card.Body>Comming Soon</Card.Body>
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
