import React from "react";
import { Card } from "@themesberg/react-bootstrap";
import { connect } from "react-redux";

import * as utils from "../utils";

export const TeamRankings = (props) => {
  const groupedModels = utils.groupByProperty(props.data, "team");

  function teamPoints(team) {
    if (groupedModels[team]) {
      return groupedModels[team].reduce(
        (previousValue, currentValue) => previousValue + currentValue["points"],
        0
      );
    }
  }

  const line = (team) => {
    return (
      <tr>
        <td className="w-25 text-center">{team}</td>
        <td className="w-25 text-center">{teamPoints(team)}</td>
        <td className="w-25 text-center">{utils.teamOwner(team)}</td>
      </tr>
    );
  };

  const teams = [...utils.getTeams()];

  teams.sort(function (x, y) {
    if (teamPoints(x) < teamPoints(y)) {
      return 1;
    }
    if (teamPoints(x) > teamPoints(y)) {
      return -1;
    }
    return 0;
  });

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header className="border-bottom border-light">
        <h5 className="mb-0">Γενική Κατάταξη</h5>
      </Card.Header>
      <Card.Body className="px-5">
        <table className="mx-auto">
          <thead>
            <tr>
              <th className="w-25 text-center">Ομάδα</th>
              <th className="w-25 text-center">Πόντοι</th>
              <th className="w-25 text-center">Παίκτης</th>
            </tr>
          </thead>
          <tbody>
            {line(teams[0], groupedModels)}
            {line(teams[1], groupedModels)}
            {line(teams[2], groupedModels)}
            {line(teams[3], groupedModels)}
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
