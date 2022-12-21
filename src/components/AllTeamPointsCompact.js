import React from "react";
import { Card, Carousel } from "react-bootstrap";
import { connect } from "react-redux";

import * as utils from "../utils";

export const AllTeamPoints = (props) => {
  const groupedModels = utils.groupByProperty(props.data, "team");
  const teams = [...utils.getTeams()];

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

  const tableLine = (model, data) => {
    return (
      <tr>
        {name(model)}
        <td className="text-right">{utils.sumPoints(data, model)}</td>
      </tr>
    );
  };

  const createTable = (team) => {
    const result = [];
    const team1 = groupedModels[team];
    var l1 = [];
    var t1 = [];
    if (team1) {
      t1 = utils.groupByProperty(team1, "model");
      l1 = Object.keys(t1);
    }

    const tableSort = (a, b, t) => {
      if (utils.sumPoints(t, a) < utils.sumPoints(t, b)) {
        return 1;
      } else if (utils.sumPoints(t, a) > utils.sumPoints(t, b)) {
        return -1;
      }
      return 0;
    };

    l1.sort((a, b) => tableSort(a, b, t1));

    l1.forEach((element) => {
      result.push(tableLine(element, t1));
    });

    return (
      <>
        <table className="mx-sm-auto border mb-2">
          <thead>
            <tr>
              <th colSpan={2} className="w-25 text-center blue-bg">
                {team}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={2} className="w-25 text-center blue-bg">
                {utils.teamOwner[team]}
              </td>
            </tr>
            <tr>
              <th className="blue-bg">Σύνολο</th>
              <td className="blue-bg text-right">
                {utils.sumPoints(groupedModels, team)}
              </td>
            </tr>
            {result}
          </tbody>
        </table>
      </>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header className="border-bottom border-light">
        <h5 className="mb-0">Ομάδες</h5>
      </Card.Header>
      <Card.Body className="px-3" id="AllTeamPointsCompact">
        <Carousel
          interval={null}
          variant="dark"
          indicators={false}
          prevIcon={<span />}
          nextIcon={<span />}
        >
          <Carousel.Item>{createTable(teams[0])}</Carousel.Item>
          <Carousel.Item>{createTable(teams[1])}</Carousel.Item>
          <Carousel.Item>{createTable(teams[2])}</Carousel.Item>
          <Carousel.Item>{createTable(teams[3])}</Carousel.Item>
        </Carousel>
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
