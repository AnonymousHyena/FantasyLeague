import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row, Card } from "react-bootstrap";

export const CounterWidget = (props) => {
  const { icon, iconColor, category, title } = props;

  return (
    <Card border="light" className="shadow-sm" style={{ marginTop: 10 }}>
      <Card.Body>
        <Row className="d-block d-flex align-items-center">
          <Col
            xl={4}
            xs={4}
            className="text-xl-center d-flex align-items-center justify-content-xl-center mb-xl-0"
          >
            <div
              className={`icon icon-shape icon-md icon-${iconColor} rounded me-4 me-sm-0`}
            >
              <FontAwesomeIcon icon={icon} />
            </div>
          </Col>
          <Col xs={8} xl={8} className="px-xl-0">
            <div className="d-block">
              <h5>{category}</h5>
              <span className="mb-1 widget-text">{title}</span>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
