import React, { useState, useEffect } from "react";
import { Col, Row, Form, Card } from "@themesberg/react-bootstrap";
import { connect } from "react-redux";
import AllTeamPoints from "../../components/AllTeamPoints";
import * as utils from "../../utils";

import TeamBreakdown from "../../components/TeamBreakdown";
import TeamBreakdownCompact from "../../components/TeamBreakdownCompact";

export const Teams = (props) => {
  const [selectedTeam, setSelectedTeam] = useState("");
  const teams = [...utils.getTeams()];

  return (
    <>
      <Row className="justify-content-lg-center d-none d-lg-block">
        <Col xs={12} className="mt-2 mb-4">
          <AllTeamPoints />
        </Col>
      </Row>

      <Row className="justify-content-center d-block">
        <Col xs={12} className="mt-2 mb-4">
          <Card xs={12}>
            <Card.Body>
              <Row>
                <Col xs={12} className="mb-3 mt-3">
                  <Form>
                    <Form.Group>
                      <Form.Select
                        onChange={(event) =>
                          setSelectedTeam(event.target.value)
                        }
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
        </Col>
      </Row>

      {selectedTeam !== "" && (
        <>
          <Row className="justify-content-lg-center d-none d-lg-block">
            <Col xs={12} className="mt-2 mb-4">
              <TeamBreakdown selectedTeam={selectedTeam} />
            </Col>
          </Row>

          <Row className="justify-content-lg-center d-block d-lg-none">
            <Col xs={12} className="mt-2 mb-4">
              <TeamBreakdownCompact selectedTeam={selectedTeam} />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

const mapStateToProps = function (state) {
  return {};
};

export default connect(mapStateToProps)(Teams);
