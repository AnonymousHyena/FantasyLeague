import React from "react";
import { Col, Card } from "react-bootstrap";
import { connect } from "react-redux";
import * as utils from "../utils";

const ContestantRankings = (props) => {
  const tableLine = (contestant, points) => {
    return (
      <tr>
        <td>{contestant}</td>
        <td>{points}</td>
      </tr>
    );
  };

  const constructTableBody = (data, sourceType) => {
    var columnTotal = [];
    const contestantsData = utils.groupByProperty(data, "contestant");
    const contestants = utils.getContestants();
    if (sourceType === "drama") {
      contestants.sort(function (x, y) {
        if (
          utils.sumPoints(contestantsData, x) <
          utils.sumPoints(contestantsData, y)
        ) {
          return -1;
        }
        if (
          utils.sumPoints(contestantsData, x) >
          utils.sumPoints(contestantsData, y)
        ) {
          return 1;
        }
        return 0;
      });
    } else {
      contestants.sort(function (x, y) {
        if (
          utils.sumPoints(contestantsData, x) <
          utils.sumPoints(contestantsData, y)
        ) {
          return 1;
        }
        if (
          utils.sumPoints(contestantsData, x) >
          utils.sumPoints(contestantsData, y)
        ) {
          return -1;
        }
        return 0;
      });
    }

    contestants.forEach((contestant) => {
      columnTotal.push(
        tableLine(contestant, utils.sumPoints(contestantsData, contestant))
      );
    });
    return columnTotal;
  };

  const constructTableByType = (sourceType) => {
    const contestantsData = utils.groupByProperty(props.data, "sourceType")[
      sourceType
    ];

    return constructTableBody(contestantsData, sourceType);
  };

  return (
    <>
      <Col xs={12} className="mt-2 mb-4 d-block">
        <Card border="light" className="shadow-sm">
          <Card.Header className="border-bottom border-light">
            <h5 className="mb-0">Γενική Κατάταξη Διαγωνιζόμενων</h5>
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

export default connect(mapStateToProps)(ContestantRankings);
