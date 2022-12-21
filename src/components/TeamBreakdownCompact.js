import React from "react";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";

import * as utils from "../utils";

export const TeamBreakdownCompact = ({ selectedTeam, ...props }) => {
  const groupedModels = utils.groupByProperty(props.data, "team");

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
    var l1 = [];
    var t1 = [];
    t1 = utils.groupByProperty(groupedModels[selectedTeam], "model");
    l1 = Object.keys(t1);

    const tableSort = (a, b, t) => {
      if (utils.sumPoints(t, a) < utils.sumPoints(t, b)) {
        return 1;
      } else if (utils.sumPoints(t, a) > utils.sumPoints(t, b)) {
        return -1;
      }
      return 0;
    };

    l1.sort((a, b) => tableSort(a, b, t1));

    return (
      <>
        <tr>
          <th className="blue-bg">Σύνολο</th>
          <td className="blue-bg text-right">
            {utils.sumPoints(groupedModels, selectedTeam)}
          </td>
        </tr>
        <tr>
          {name(l1[0])}
          <td className="text-right">{utils.sumPoints(t1, l1[0])}</td>
        </tr>
        <tr>
          {name(l1[1])}
          <td className="text-right">{utils.sumPoints(t1, l1[1])}</td>
        </tr>
        <tr>
          {name(l1[2])}
          <td className="text-right">{utils.sumPoints(t1, l1[2])}</td>
        </tr>
        <tr>
          {name(l1[3])}
          <td className="text-right">{utils.sumPoints(t1, l1[3])}</td>
        </tr>
        <tr>
          {name(l1[4])}
          <td className="text-right">{utils.sumPoints(t1, l1[4])}</td>
        </tr>
        <tr>
          {name(l1[5])}
          <td className="text-right">{utils.sumPoints(t1, l1[5])}</td>
        </tr>
        {selectedTeam === "Γεια σου Τάσο" && (
          <>
            <tr>
              {name(l1[6])}
              <td className="text-right">{utils.sumPoints(t1, l1[6])}</td>
            </tr>
          </>
        )}
      </>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header className="border-bottom border-light">
        <h5 className="mb-0">Μέλη Ομάδας "{selectedTeam}"</h5>
      </Card.Header>
      <Card.Body className="px-3">
        <table className="mx-sm-auto border">
          <thead>
            <tr>
              <th colSpan={2} className="w-25 text-center blue-bg">
                {selectedTeam}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={2} className="w-25 text-center blue-bg">
                {utils.teamOwner[selectedTeam]}
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

export default connect(mapStateToProps)(TeamBreakdownCompact);
