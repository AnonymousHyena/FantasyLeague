import React, { useState, useEffect } from "react";
import { Col, Row, Form, Card } from "react-bootstrap";
import { connect } from "react-redux";
import { CounterWidget } from "../../components/Widgets";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import * as utils from "../../utils";
import PlateauGeneralInfo from "../../components/PlateauGeneralInfo";

const Plateaus = (props) => {
  const [selectedPlateau, setSelectedPlateau] = useState("");
  const plateaus = utils.getPlateaus();

  return (
    <>
      <Row className="justify-content-md-center">
        <Col xs={12} className="mt-2 mb-4 d-block d-sm-block">
          <CounterWidget
            category="Τελευταίο Πλατό"
            title={utils.translatePlateaus(plateaus[plateaus.length - 1])}
            icon={faCalendarDay}
            iconColor="shape-secondary"
          />
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        <PlateauGeneralInfo selectedPlateau={plateaus[plateaus.length - 1]} />
      </Row>

      <Row className="justify-content-center d-block">
        <Card>
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
                      <option defaultValue key="Επιλογή Ομάδας" value="">
                        Επιλογή Πλατό
                      </option>
                      {plateaus &&
                        plateaus.sort().map((plateau) => (
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
      </Row>

      {selectedPlateau !== "" && (
        <>
          <Row className="justify-content-md-center">
            <PlateauGeneralInfo selectedPlateau={selectedPlateau} />
          </Row>

          <Row></Row>
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
