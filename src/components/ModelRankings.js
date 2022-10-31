import React from "react";
import { Col, Card } from "react-bootstrap";
import { connect } from "react-redux";
import * as utils from "../utils";

const ModelRankings = (props) => {
  const tableLine = (model, points) => {
    return (
      <tr>
        <td>{model}</td>
        <td>{points}</td>
      </tr>
    );
  };

  const constructTableBody = (data) => {
    var columnTotal = [];
    const modelsData = utils.groupByProperty(data, "model");
    const models = utils.getModels();

    models.sort(function (x, y) {
      if (utils.sumPoints(modelsData, x) < utils.sumPoints(modelsData, y)) {
        return 1;
      }
      if (utils.sumPoints(modelsData, x) > utils.sumPoints(modelsData, y)) {
        return -1;
      }
      return 0;
    });

    models.forEach((model) => {
      columnTotal.push(tableLine(model, utils.sumPoints(modelsData, model)));
    });
    return columnTotal;
  };

  const constructTableByType = (sourceType) => {
    const modelsData = utils.groupByProperty(props.data, "sourceType")[
      sourceType
    ];

    return constructTableBody(modelsData);
  };

  return (
    <>
      <Col xs={12} className="mt-2 mb-4 d-block">
        <Card border="light" className="shadow-sm">
          <Card.Header className="border-bottom border-light">
            <h5 className="mb-0">Γενική Κατάταξη Μοντέλων</h5>
          </Card.Header>
          <Card.Body className="px-3">
            <Col xs={12} lg={3} className="p-0">
              <table className="border w-100">
                <thead>
                  <tr>
                    <th colSpan={2} className="blue-bg">
                      Total Points
                    </th>
                  </tr>
                </thead>
                <tbody>{constructTableBody(props.data)}</tbody>
              </table>
            </Col>
            <Col xs={12} lg={3} className="p-0">
              <table className="border w-100">
                <thead>
                  <tr>
                    <th colSpan={2} className="blue-bg">
                      Placement Points
                    </th>
                  </tr>
                </thead>
                <tbody>{constructTableByType("placement")}</tbody>
              </table>
            </Col>
            <Col xs={12} lg={3} className="p-0">
              <table className="border w-100">
                <thead>
                  <tr>
                    <th colSpan={2} className="blue-bg">
                      Drama Points
                    </th>
                  </tr>
                </thead>
                <tbody>{constructTableByType("drama")}</tbody>
              </table>
            </Col>
            <Col xs={12} lg={3} className="p-0">
              <table className="border w-100">
                <thead>
                  <tr>
                    <th colSpan={2} className="blue-bg">
                      Misc Points
                    </th>
                  </tr>
                </thead>
                <tbody>{constructTableByType("misc")}</tbody>
              </table>
            </Col>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

const mapStateToProps = function (state) {
  return {
    data: state.data,
  };
};

export default connect(mapStateToProps)(ModelRankings);
