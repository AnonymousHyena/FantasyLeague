import React from "react";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import { faCrown } from "@fortawesome/free-solid-svg-icons";

import * as utils from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const TeamRankings = (props) => {
  const groupedContestants = utils.groupByProperty(props.data, "team");

  const line = (team) => {
    return (
      <tr>
        <td className="w-25 text-center">
          {team === utils.getWinner() && (
            <>
              <FontAwesomeIcon icon={faCrown} />{" "}
            </>
          )}
          {team}
          {team === utils.getWinner() && (
            <>
              {" "}
              <FontAwesomeIcon icon={faCrown} />
            </>
          )}
        </td>
        <td className="w-25 text-center">
          {utils.sumPoints(groupedContestants, team)}
        </td>
        <td className="w-25 text-center">{utils.teamOwner[team]}</td>
      </tr>
    );
  };

  const teams = [...utils.getTeams()];

  teams.sort(function (x, y) {
    if (
      utils.sumPoints(groupedContestants, x) <
      utils.sumPoints(groupedContestants, y)
    ) {
      return 1;
    }
    if (
      utils.sumPoints(groupedContestants, x) >
      utils.sumPoints(groupedContestants, y)
    ) {
      return -1;
    }
    return 0;
  });

  return (
    <Card xs={12} border="light" className="shadow-sm">
      <Card.Header className="border-bottom border-light">
        <h5 className="mb-0">Γενική Κατάταξη</h5>
      </Card.Header>
      <Card.Body className="px-sm-5">
        <table className="mx-auto">
          <thead>
            <tr>
              <th className="w-25 text-center">Ομάδα</th>
              <th className="w-25 text-center">Πόντοι</th>
              <th className="w-25 text-center">Παίκτης</th>
            </tr>
          </thead>
          <tbody>
            {line(teams[0], groupedContestants)}
            {line(teams[1], groupedContestants)}
            {line(teams[2], groupedContestants)}
            {line(teams[3], groupedContestants)}
          </tbody>
        </table>
      </Card.Body>
    </Card>
  );
};

const mapStateToProps = function (state) {
  return {
    data: state.data,
  };
};

export default connect(mapStateToProps)(TeamRankings);
