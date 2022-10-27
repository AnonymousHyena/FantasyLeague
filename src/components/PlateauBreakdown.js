import React from "react";
import { Card, Col } from "react-bootstrap";
import { connect } from "react-redux";
import * as utils from "../utils";

export const PlateauBreakdown = ({ selectedPlateau, ...props }) => {
  if (props.data[0]) {
    const tableLine = (model, reason, points) => {
      return (
        <tr>
          <td>{model}</td>
          <td>{utils.pointsTranslateDict[reason]}</td>
          <td>{points}</td>
        </tr>
      );
    };

    const makeTable = function (key) {
      if (!Object.keys(groupedData).includes(key)) {
        return (
          <>
            <div>-</div>
          </>
        );
      }
      return (
        <>
          <table className="w-100">
            <thead>
              <tr>
                <th>Μοντέλο</th>
                <th>Αιτία</th>
                <th>Πόντοι</th>
              </tr>
            </thead>
            <tbody>{makeTableContents(key)}</tbody>
          </table>
        </>
      );
    };

    const groupedData = utils.groupByProperty(
      utils.groupByProperty(props.data, "plateau")[selectedPlateau],
      "sourceType"
    );

    const makeTableContents = function (key) {
      const result = [];

      groupedData[key].forEach((element) => {
        result.push(
          tableLine(element["model"], element["source"], element["points"])
        );
      });
      return result;
    };

    return (
      <>
        <Col xs={12} lg={4} className="mt-2 mb-4 d-block">
          <Card>
            <Card.Header className="border-bottom border-light">
              <h5 className="mb-0">Placement Points</h5>
            </Card.Header>
            <Card.Body className="text-center">
              {makeTable("placement")}
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} lg={4} className="mt-2 mb-4 d-block">
          <Card>
            <Card.Header className="border-bottom border-light">
              <h5 className="mb-0">Drama Points</h5>
            </Card.Header>
            <Card.Body className="text-center">{makeTable("drama")}</Card.Body>
          </Card>
        </Col>

        <Col xs={12} lg={4} className="mt-2 mb-4 d-block">
          <Card>
            <Card.Header className="border-bottom border-light">
              <h5 className="mb-0">Misc Points</h5>
            </Card.Header>
            <Card.Body className="text-center">{makeTable("misc")}</Card.Body>
          </Card>
        </Col>
      </>
    );
  }
};

const mapStateToProps = function (state) {
  return {
    data: state.data,
  };
};

export default connect(mapStateToProps)(PlateauBreakdown);
