import React from "react";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";

import * as utils from "../utils";

export const TeamBreakdown = ({ selectedTeam, ...props }) => {
  const groupedModels = utils.groupByProperty(props.data, "team");
  const team = groupedModels[selectedTeam];
  const t1 = utils.groupByProperty(team, "model");
  const l1 = Object.keys(t1);

  const t2 = utils.groupByProperty(team, "plateau");
  const plateauKeys = Object.keys(t2);

  const cells = function (t, l2, l1) {
    return (
      <>
        <td className="">{utils.translatePlateaus(l2)}</td>
        <td className="text-right">
          {utils.sumPoints(utils.groupByProperty(t[l2], "model"), l1)}
        </td>
      </>
    );
  };

  const emptyCells = function () {
    return (
      <>
        <td className=""></td>
        <td className="text-right"></td>
      </>
    );
  };

  const cellsHeaders = function (l1) {
    return (
      <th colSpan={2} className="text-center blue-bg">
        {l1}
      </th>
    );
  };
  const resCellsHeaders = [];
  l1.forEach((element) => resCellsHeaders.push(cellsHeaders(element)));

  const cellsSubHeaders = function (t, l1) {
    return (
      <>
        <th className="blue-bg">Σύνολο</th>
        <td className="blue-bg text-right">{utils.sumPoints(t, l1)}</td>
      </>
    );
  };
  const resCellsSubHeaders = [];
  l1.forEach((element) =>
    resCellsSubHeaders.push(cellsSubHeaders(t1, element))
  );

  const line = function (t, l2) {
    const result = [];

    l1.forEach((element) => {
      let isIn = true;
      for (let i = 0; i < plateauKeys.length; i++) {
        if (plateauKeys[i] === l2) {
          break;
        }
        if (!utils.isInGame(t[plateauKeys[i]], element)) {
          isIn = false;
        }
      }
      if (isIn) {
        result.push(cells(t, l2, element));
      } else {
        result.push(emptyCells());
      }
    });

    return <tr>{result}</tr>;
  };

  const makeTable = function (t, l2) {
    const result = [];

    l2.forEach((element, i) => {
      if (i !== 0) {
        result.push(line(t, element));
      }
    });

    return result;
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header className="border-bottom border-light">
        <h5 className="mb-0">Μέλη Ομάδας "{selectedTeam}"</h5>
      </Card.Header>
      <Card.Body>
        <table className="mx-auto border w-100">
          <thead>
            <tr>{resCellsHeaders}</tr>
            <tr>{resCellsSubHeaders}</tr>
          </thead>
          <tbody>{makeTable(t2, plateauKeys)}</tbody>
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

export default connect(mapStateToProps)(TeamBreakdown);
