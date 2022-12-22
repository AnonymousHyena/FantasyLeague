import React from "react";
import { Card, Col } from "react-bootstrap";
import { connect } from "react-redux";
import * as utils from "../utils";

export const EpisodeBreakdown = ({ selectedEpisode, ...props }) => {
  if (props.data[0]) {
    const tableLine = (contestantData) => {
      var sources = [];
      var points = 0;
      contestantData.forEach((element) => {
        sources.push(utils.pointsTranslateDict[element.source]);
        sources.push(<br />);
        points += element.points;
      });
      return (
        <tr>
          <td className="border-bottom">{contestantData[0].contestant}</td>
          <td className="border-bottom">{sources}</td>
          <td className="border-bottom">{points}</td>
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
                <th className="border-bottom">Διαγωνιζόμενος/η</th>
                <th className="border-bottom">Αιτία</th>
                <th className="border-bottom">Πόντοι</th>
              </tr>
            </thead>
            <tbody>{makeTableContents(key)}</tbody>
          </table>
        </>
      );
    };

    const groupedData = utils.groupByProperty(
      utils.groupByProperty(props.data, "episode")[selectedEpisode],
      "sourceType"
    );

    const makeTableContents = function (key) {
      const result = [];
      const newData = utils.groupByProperty(groupedData[key], "contestant");
      Object.keys(newData).forEach((contestant) => {
        result.push(tableLine(newData[contestant]));
      });
      return result;
    };

    return (
      <>
        <Col lg={4} className="mt-2 mb-4 d-none d-lg-block">
          <Card>
            <Card.Header className="border-bottom border-light">
              <h5 className="mb-0">Placement Points</h5>
            </Card.Header>
            <Card.Body className="text-center episode-breakdown">
              {makeTable("placement")}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4} className="mt-2 mb-4 d-none d-lg-block">
          <Card>
            <Card.Header className="border-bottom border-light">
              <h5 className="mb-0">Drama Points</h5>
            </Card.Header>
            <Card.Body className="text-center episode-breakdown">
              {makeTable("drama")}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4} className="mt-2 mb-4 d-none d-lg-block">
          <Card>
            <Card.Header className="border-bottom border-light">
              <h5 className="mb-0">Misc Points</h5>
            </Card.Header>
            <Card.Body className="text-center episode-breakdown">
              {makeTable("misc")}
            </Card.Body>
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

export default connect(mapStateToProps)(EpisodeBreakdown);
