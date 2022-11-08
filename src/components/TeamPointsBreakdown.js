import React from "react";
import { Col } from "react-bootstrap";
import { connect } from "react-redux";
import { CounterWidget } from "./Widgets";
import {
  faRankingStar,
  faIcons,
  faPooStorm,
} from "@fortawesome/free-solid-svg-icons";

import * as utils from "../utils";

export const TeamPointsBreakdown = ({ selectedTeam, ...props }) => {
  const groupedModels = utils.groupByProperty(
    utils.groupByProperty(props.data, "team")[selectedTeam],
    "sourceType"
  );

  return (
    <>
      <Col xs={12} lg={4} className="mt-1 mb-1 mt-lg-2 mb-lg-4 d-block">
        <CounterWidget
          category="Placement Points"
          title={utils.sumPoints(groupedModels, "placement")}
          icon={faRankingStar}
          iconColor="shape-secondary"
        />
      </Col>
      <Col xs={12} lg={4} className="mt-1 mb-1 mt-lg-2 mb-lg-4 d-block">
        <CounterWidget
          category="Drama Points"
          title={utils.sumPoints(groupedModels, "drama")}
          icon={faPooStorm}
          iconColor="shape-secondary"
        />
      </Col>
      <Col xs={12} lg={4} className="mt-1 mb-1 mt-lg-2 mb-lg-4 d-block">
        <CounterWidget
          category="Misc Points"
          title={utils.sumPoints(groupedModels, "misc")}
          icon={faIcons}
          iconColor="shape-secondary"
        />
      </Col>
    </>
  );
};

const mapStateToProps = function (state) {
  return {
    data: state.data,
  };
};

export default connect(mapStateToProps)(TeamPointsBreakdown);
