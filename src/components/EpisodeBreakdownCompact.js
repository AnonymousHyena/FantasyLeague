import React from "react";
import { Card, Col } from "react-bootstrap";
import { connect } from "react-redux";
import * as utils from "../utils";

export const EpisodeBreakdownCompact = ({ selectedEpisode, ...props }) => {
  if (props.data[0]) {
    const tableLine = (contestant, points) => {
      return (
        <tr>
          <td>{contestant}</td>
          <td>{points}</td>
        </tr>
      );
    };

    const makeTable = function () {
      return (
        <>
          <table className="w-100">
            <thead>
              <tr>
                <th>Διαγωνιζόμενος/η</th>
                <th>Πόντοι</th>
              </tr>
            </thead>
            <tbody>{makeTableContents()}</tbody>
          </table>
        </>
      );
    };

    const groupedData = utils.groupByProperty(
      utils.groupByProperty(props.data, "episode")[selectedEpisode],
      "contestant"
    );

    const makeTableContents = function () {
      const result = [];
      const contestants = Object.keys(groupedData);

      contestants.sort((a, b) => {
        if (utils.sumPoints(groupedData, a) < utils.sumPoints(groupedData, b)) {
          return 1;
        } else if (
          utils.sumPoints(groupedData, a) > utils.sumPoints(groupedData, b)
        ) {
          return -1;
        }
        return 0;
      });

      contestants.forEach((contestant) => {
        result.push(
          tableLine(contestant, utils.sumPoints(groupedData, contestant))
        );
      });
      return result;
    };

    return (
      <>
        <Col xs={12} className="mt-2 mb-4 d-block d-lg-none">
          <Card>
            <Card.Header className="border-bottom border-light">
              <h5 className="mb-0">Total Points</h5>
            </Card.Header>
            <Card.Body className="text-center">{makeTable()}</Card.Body>
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

export default connect(mapStateToProps)(EpisodeBreakdownCompact);
