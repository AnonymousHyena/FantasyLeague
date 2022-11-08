import React from "react";
import { Col, Row, Form, Card } from "react-bootstrap";
import { connect } from "react-redux";

export const SelectForm = ({ options, setter, def, title, ...props }) => {
  return (
    <Row className="justify-content-center d-block">
      <Col xs={12} className="mt-1 mb-1 mt-lg-2 mb-lg-4">
        <Card xs={12}>
          <Card.Header className="border-bottom border-light">
            <h5 className="mb-0">{title}</h5>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col xs={12} className="mb-3 mt-3">
                <Form>
                  <Form.Group>
                    <Form.Select
                      onChange={(event) => setter(event.target.value)}
                      value={def}
                    >
                      {options &&
                        options.sort().map((option) => (
                          <option key={option} value={option}>
                            {option}
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
  );
};

const mapStateToProps = function (state) {
  return {};
};

export default connect(mapStateToProps)(SelectForm);
