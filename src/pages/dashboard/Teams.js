import React, { useState } from "react";
import { Col, Row, Form, Card } from "@themesberg/react-bootstrap";
import { connect } from "react-redux";
import AllTeamPoints from "../../components/AllTeamPoints";
import * as utils from "../../utils";

import TeamBreakdown from "../../components/TeamBreakdown";

export const Teams = (props) => {
  // useEffect(() => {}, [props.data]);
  const [selectedTeam, setselectedTeam] = useState("");
  const teams = [...utils.getTeams()];

  return (
    <>
      <Row className="justify-content-md-center">
        <Col xs={12} className="mt-2 mb-4 d-none d-sm-block">
          <AllTeamPoints />
        </Col>
      </Row>

      <Card>
        {/* <Card.Header>
        <h5 className="mb-0">Επιλογή Ομάδας</h5>
        </Card.Header> */}
        <Card.Body>
          <Row>
            <Col xs={12} className="mb-3 mt-3">
              <Form>
                <Form.Group>
                  <Form.Select
                    onChange={(event) => setselectedTeam(event.target.value)}
                  >
                    <option defaultValue key="Επιλογή Ομάδας" value="">
                      Επιλογή Ομάδας
                    </option>
                    {teams &&
                      teams.sort().map((team) => (
                        <option key={team} value={team}>
                          {team}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      {selectedTeam !== "" && (
        <>
          <Row className="justify-content-md-center">
            <Col xs={12} className="mt-2 mb-4 d-none d-sm-block">
              <TeamBreakdown selectedTeam={selectedTeam} />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

const mapStateToProps = function (state) {
  return {
    data: state.data,
  };
};

export default connect(mapStateToProps)(Teams);
