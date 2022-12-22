import React from "react";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";

import * as utils from "../utils";

export const AllTeamPoints = (props) => {
  const groupedContestants = utils.groupByProperty(props.data, "team");
  const teams = [...utils.getTeams()];

  function sumPoints(lst, team) {
    if (lst[team]) {
      return lst[team].reduce(
        (previousValue, currentValue) => previousValue + currentValue["points"],
        0
      );
    }
  }

  const name = (name) => {
    const isNameIn = utils.isInGame(props.data, name);
    return (
      <>
        {isNameIn && <td>{name}</td>}
        {!isNameIn && (
          <td>
            <s>{name}</s>
          </td>
        )}
      </>
    );
  };

  const tableLines = () => {
    const team1 = groupedContestants[teams[0]];
    const team2 = groupedContestants[teams[1]];
    const team3 = groupedContestants[teams[2]];
    const team4 = groupedContestants[teams[3]];
    var l1 = [];
    var l2 = [];
    var l3 = [];
    var l4 = [];
    var t1 = [];
    var t2 = [];
    var t3 = [];
    var t4 = [];
    if (team1) {
      t1 = utils.groupByProperty(team1, "contestant");
      l1 = Object.keys(t1);
    }
    if (team2) {
      t2 = utils.groupByProperty(team2, "contestant");
      l2 = Object.keys(t2);
    }
    if (team3) {
      t3 = utils.groupByProperty(team3, "contestant");
      l3 = Object.keys(t3);
    }
    if (team4) {
      t4 = utils.groupByProperty(team4, "contestant");
      l4 = Object.keys(t4);
    }

    const tableSort = (a, b, t) => {
      if (sumPoints(t, a) < sumPoints(t, b)) {
        return 1;
      } else if (sumPoints(t, a) > sumPoints(t, b)) {
        return -1;
      }
      return 0;
    };

    l1.sort((a, b) => tableSort(a, b, t1));
    l2.sort((a, b) => tableSort(a, b, t2));
    l3.sort((a, b) => tableSort(a, b, t3));
    l4.sort((a, b) => tableSort(a, b, t4));

    return (
      <>
        <tr key={"AllTeamPointsRow1"}>
          <th className="blue-bg">Σύνολο</th>
          <td className="blue-bg text-right">
            {sumPoints(groupedContestants, teams[0])}
          </td>
          <th className="blue-bg">Σύνολο</th>
          <td className="blue-bg text-right">
            {sumPoints(groupedContestants, teams[1])}
          </td>
          <th className="blue-bg">Σύνολο</th>
          <td className="blue-bg text-right">
            {sumPoints(groupedContestants, teams[2])}
          </td>
          <th className="blue-bg">Σύνολο</th>
          <td className="blue-bg text-right">
            {sumPoints(groupedContestants, teams[3])}
          </td>
        </tr>
        <tr key={"AllTeamPointsRow2"}>
          {name(l1[0])}
          <td className="text-right">{sumPoints(t1, l1[0])}</td>
          {name(l2[0])}
          <td className="text-right">{sumPoints(t2, l2[0])}</td>
          {name(l3[0])}
          <td className="text-right">{sumPoints(t3, l3[0])}</td>
          {name(l4[0])}
          <td className="text-right">{sumPoints(t4, l4[0])}</td>
        </tr>
        <tr key={"AllTeamPointsRow3"}>
          {name(l1[1])}
          <td className="text-right">{sumPoints(t1, l1[1])}</td>
          {name(l2[1])}
          <td className="text-right">{sumPoints(t2, l2[1])}</td>
          {name(l3[1])}
          <td className="text-right">{sumPoints(t3, l3[1])}</td>
          {name(l4[1])}
          <td className="text-right">{sumPoints(t4, l4[1])}</td>
        </tr>
        <tr key={"AllTeamPointsRow4"}>
          {name(l1[2])}
          <td className="text-right">{sumPoints(t1, l1[2])}</td>
          {name(l2[2])}
          <td className="text-right">{sumPoints(t2, l2[2])}</td>
          {name(l3[2])}
          <td className="text-right">{sumPoints(t3, l3[2])}</td>
          {name(l4[2])}
          <td className="text-right">{sumPoints(t4, l4[2])}</td>
        </tr>
        <tr key={"AllTeamPointsRow5"}>
          {name(l1[3])}
          <td className="text-right">{sumPoints(t1, l1[3])}</td>
          {name(l2[3])}
          <td className="text-right">{sumPoints(t2, l2[3])}</td>
          {name(l3[3])}
          <td className="text-right">{sumPoints(t3, l3[3])}</td>
          {name(l4[3])}
          <td className="text-right">{sumPoints(t4, l4[3])}</td>
        </tr>
        <tr key={"AllTeamPointsRow6"}>
          {name(l1[4])}
          <td className="text-right">{sumPoints(t1, l1[4])}</td>
          {name(l2[4])}
          <td className="text-right">{sumPoints(t2, l2[4])}</td>
          {name(l3[4])}
          <td className="text-right">{sumPoints(t3, l3[4])}</td>
          {name(l4[4])}
          <td className="text-right">{sumPoints(t4, l4[4])}</td>
        </tr>
        <tr key={"AllTeamPointsRow7"}>
          {name(l1[5])}
          <td className="text-right">{sumPoints(t1, l1[5])}</td>
          {name(l2[5])}
          <td className="text-right">{sumPoints(t2, l2[5])}</td>
          {name(l3[5])}
          <td className="text-right">{sumPoints(t3, l3[5])}</td>
          {name(l4[5])}
          <td className="text-right">{sumPoints(t4, l4[5])}</td>
        </tr>
        <tr key={"AllTeamPointsRow8"}>
          {name(l1[6])}
          <td className="text-right">{sumPoints(t1, l1[6])}</td>
          {name(l2[6])}
          <td className="text-right">{sumPoints(t2, l2[6])}</td>
          {name(l3[6])}
          <td className="text-right">{sumPoints(t3, l3[6])}</td>
          {name(l4[6])}
          <td className="text-right">{sumPoints(t4, l4[6])}</td>
        </tr>
      </>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header className="border-bottom border-light">
        <h5 className="mb-0">Ομάδες</h5>
      </Card.Header>
      <Card.Body className="px-3">
        <table className="mx-sm-auto border">
          <thead>
            <tr key={"teamNames"}>
              <th colSpan={2} className="w-25 text-center blue-bg">
                {teams[0]}
              </th>
              <th colSpan={2} className="w-25 text-center blue-bg">
                {teams[1]}
              </th>
              <th colSpan={2} className="w-25 text-center blue-bg">
                {teams[2]}
              </th>
              <th colSpan={2} className="w-25 text-center blue-bg">
                {teams[3]}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr key={"teamOwners"}>
              <td colSpan={2} className="w-25 text-center blue-bg">
                {utils.teamOwner[teams[0]]}
              </td>
              <td colSpan={2} className="w-25 text-center blue-bg">
                {utils.teamOwner[teams[1]]}
              </td>
              <td colSpan={2} className="w-25 text-center blue-bg">
                {utils.teamOwner[teams[2]]}
              </td>
              <td colSpan={2} className="w-25 text-center blue-bg">
                {utils.teamOwner[teams[3]]}
              </td>
            </tr>
            {tableLines()}
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

export default connect(mapStateToProps)(AllTeamPoints);
