import React, { useState } from "react";
import { Col, Row, Form, Card } from "react-bootstrap";
import { connect } from "react-redux";
import * as utils from "../../utils";
import PlateauGeneralInfo from "../../components/PlateauGeneralInfo";
import PlateauBreakdown from "../../components/PlateauBreakdown";
import PlateauBreakdownCompact from "../../components/PlateauBreakdownCompact";

const Plateaus = (props) => {
  const plateaus = utils.getPlateaus();
  const [selectedPlateau, setSelectedPlateau] = useState(
    plateaus[plateaus.length - 1]
  );

  return (
    <>
      <Row className="justify-content-center d-block">
        <Col xs={12} className="mt-2 mb-4">
          <Card>
            <Card.Header className="border-bottom border-light">
              <h5 className="mb-0">Επιλογή Πλατό</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col xs={12} className="mb-3 mt-3">
                  <Form>
                    <Form.Group>
                      <Form.Select
                        onChange={(event) =>
                          setSelectedPlateau(event.target.value)
                        }
                      >
                        {plateaus &&
                          plateaus
                            .sort()
                            .reverse()
                            .map((plateau) => (
                              <option
                                key={utils.translatePlateaus(plateau)}
                                value={plateau}
                              >
                                {utils.translatePlateaus(plateau)}
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

      {selectedPlateau !== "" && (
        <>
          <Row className="justify-content-md-center">
            <PlateauGeneralInfo selectedPlateau={selectedPlateau} />
          </Row>

          <Row>
            <PlateauBreakdown selectedPlateau={selectedPlateau} />
          </Row>

          <Row>
            <PlateauBreakdownCompact selectedPlateau={selectedPlateau} />
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

export default connect(mapStateToProps)(Plateaus);
