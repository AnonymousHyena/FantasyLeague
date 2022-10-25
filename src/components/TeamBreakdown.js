import React from "react";
import { Card } from "@themesberg/react-bootstrap";
import { connect } from "react-redux";

import * as utils from "../utils";

export const TeamBreakdown = ({ selectedTeam, ...props }) => {
  const groupedModels = utils.groupByProperty(props.data, "team");
  const team = groupedModels[selectedTeam];
  const t1 = utils.groupByProperty(team, "model");
  const l1 = Object.keys(t1);

  const t2 = utils.groupByProperty(team, "plateau");
  const l2 = Object.keys(t2);

  const line = function (t, l1, l2) {
    return (
      <tr>
        <td className="">{utils.translatePlateaus(l2)}</td>
        <td className="text-right">
          {utils.sumPoints(utils.groupByProperty(t[l2], "model"), l1[0]) | 0}
        </td>
        <td className="">{utils.translatePlateaus(l2)}</td>
        <td className="text-right">
          {utils.sumPoints(utils.groupByProperty(t[l2], "model"), l1[1]) | 0}
        </td>
        <td className="">{utils.translatePlateaus(l2)}</td>
        <td className="text-right">
          {utils.sumPoints(utils.groupByProperty(t[l2], "model"), l1[2]) | 0}
        </td>
        <td className="">{utils.translatePlateaus(l2)}</td>
        <td className="text-right">
          {utils.sumPoints(utils.groupByProperty(t[l2], "model"), l1[3]) | 0}
        </td>
        <td className="">{utils.translatePlateaus(l2)}</td>
        <td className="text-right">
          {utils.sumPoints(utils.groupByProperty(t[l2], "model"), l1[4]) | 0}
        </td>
        {selectedTeam === "Ουμφοσυγκλομανιφίκ" && (
          <>
            <td className="">{utils.translatePlateaus(l2)}</td>
            <td className="text-right">
              {utils.sumPoints(utils.groupByProperty(t[l2], "model"), l1[5]) |
                0}
            </td>
          </>
        )}
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header className="border-bottom border-light">
        <h5 className="mb-0">Μέλη Ομάδας "{selectedTeam}"</h5>
      </Card.Header>
      <Card.Body>
        <table className="mx-auto border w-75">
          <thead>
            <tr>
              <th colSpan={2} className="text-center blue-bg">
                {l1[0]}
              </th>
              <th colSpan={2} className="text-center blue-bg">
                {l1[1]}
              </th>
              <th colSpan={2} className="text-center blue-bg">
                {l1[2]}
              </th>
              <th colSpan={2} className="text-center blue-bg">
                {l1[3]}
              </th>
              <th colSpan={2} className="text-center blue-bg">
                {l1[4]}
              </th>
              {selectedTeam === "Ουμφοσυγκλομανιφίκ" && (
                <>
                  <th colSpan={2} className="text-center blue-bg">
                    {l1[5]}
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="blue-bg">Σύνολο</th>
              <td className="blue-bg text-right">
                {utils.sumPoints(t1, l1[0])}
              </td>
              <th className="blue-bg">Σύνολο</th>
              <td className="blue-bg text-right">
                {utils.sumPoints(t1, l1[1])}
              </td>
              <th className="blue-bg">Σύνολο</th>
              <td className="blue-bg text-right">
                {utils.sumPoints(t1, l1[2])}
              </td>
              <th className="blue-bg">Σύνολο</th>
              <td className="blue-bg text-right">
                {utils.sumPoints(t1, l1[3])}
              </td>
              <th className="blue-bg">Σύνολο</th>
              <td className="blue-bg text-right">
                {utils.sumPoints(t1, l1[4])}
              </td>
              {selectedTeam === "Ουμφοσυγκλομανιφίκ" && (
                <>
                  <th className="blue-bg">Σύνολο</th>
                  <td className="blue-bg text-right">
                    {utils.sumPoints(t1, l1[5])}
                  </td>
                </>
              )}
            </tr>
            {line(t2, l1, l2[0])}
            {line(t2, l1, l2[1])}
            {line(t2, l1, l2[2])}
            {line(t2, l1, l2[3])}
            {line(t2, l1, l2[4])}
            {line(t2, l1, l2[5])}
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

export default connect(mapStateToProps)(TeamBreakdown);
