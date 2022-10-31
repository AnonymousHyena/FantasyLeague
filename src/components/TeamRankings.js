import React from "react";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";

import * as utils from "../utils";

export const TeamRankings = (props) => {
  const groupedModels = utils.groupByProperty(props.data, "team");

  const line = (team) => {
    return (
      <tr>
        <td className="w-25 text-center">{team}</td>
        <td className="w-25 text-center">
          {utils.sumPoints(groupedModels, team)}
        </td>
        <td className="w-25 text-center">{utils.teamOwner(team)}</td>
      </tr>
    );
  };

  const teams = [...utils.getTeams()];

  teams.sort(function (x, y) {
    if (utils.sumPoints(groupedModels, x) < utils.sumPoints(groupedModels, y)) {
      return 1;
    }
    if (utils.sumPoints(groupedModels, x) > utils.sumPoints(groupedModels, y)) {
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
