import React from "react";
import { Card } from "@themesberg/react-bootstrap";
import { connect } from "react-redux";

import * as utils from "../utils";

export const TeamRankings = (props) => {
  function groupBy(objectArray, property) {
    return objectArray.reduce((acc, obj) => {
      const key = obj[property];
      const curGroup = acc[key] ?? [];

      return { ...acc, [key]: [...curGroup, obj] };
    }, {});
  }
  const groupedModels = groupBy(props.data, "team");

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

  const teams = [
    "Το Κορμί σου το Φρυδίσιο",
    "Ουμφοσυγκλομανιφίκ",
    "Φρυδερίκη αγάπη μου",
    "Ομάδα",
  ];

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
        <h5 className="mb-0">Ranking</h5>
      </Card.Header>
      <Card.Body className="px-5">
        <table className="mx-auto">
          <thead>
            <tr>
              <th className="w-25 text-center">Team</th>
              <th className="w-25 text-center">Points</th>
              <th className="w-25 text-center">Owner</th>
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
