import React from "react";
import { Col } from "react-bootstrap";
import { connect } from "react-redux";
import { CounterWidget } from "./Widgets";
import {
  faRankingStar,
  faHeartCrack,
  faPiggyBank,
} from "@fortawesome/free-solid-svg-icons";
import * as utils from "../utils";

export const PlateauGeneralInfo = ({ selectedPlateau, ...props }) => {
  if (props.data[0]) {
    const groupedData = utils.groupByProperty(props.data, "plateau");

    let modelFirst = groupedData[selectedPlateau].filter(
      (element) =>
        element["source"] === "firstPlace" ||
        element["source"] === "firstPlaceDis"
    );
    const result = [];
    if (modelFirst.length > 0) {
      // modelFirst = modelFirst[0]["model"];
      modelFirst.forEach((element) => {
        result.push(element["model"]);
      });
      modelFirst = result.join(" / ");
    } else {
      modelFirst = " - ";
    }

    const groupedDataModel = utils.groupByProperty(
      groupedData[selectedPlateau],
      "model"
    );
    const models = Object.keys(groupedDataModel);
    const modelPoints = {};
    models.map(
      (model) => (modelPoints[model] = utils.sumPoints(groupedDataModel, model))
    );
    let arr = Object.values(modelPoints);
    let max = Math.max(...arr);
    const modelMostPoints = models
      .filter((model) => modelPoints[model] === max)
      .join(" / ");

    let modelLeave = Object.keys(
      utils.groupByProperty(
        groupedData[selectedPlateau].filter(
          (element) =>
            element["source"] === "quit" || element["source"] === "lastPlace"
        ),
        "model"
      )
    ).join(" / ");

    return (
      <>
        <Col xs={12} lg={4} className="mt-1 mb-1 mt-lg-2 mb-lg-4 d-block">
          <CounterWidget
            category="Πρώτη Θέση"
            title={modelFirst}
            icon={faRankingStar}
            iconColor="shape-secondary"
          />
        </Col>
        <Col xs={12} lg={4} className="mt-1 mb-1 mt-lg-2 mb-lg-4 d-block">
          <CounterWidget
            category="Περισσότεροι Πόντοι"
            title={modelMostPoints}
            icon={faPiggyBank}
            iconColor="shape-secondary"
          />
        </Col>
        <Col xs={12} lg={4} className="mt-1 mb-1 mt-lg-2 mb-lg-4 d-block">
          <CounterWidget
            category="Αποχώρηση"
            title={modelLeave}
            icon={faHeartCrack}
            iconColor="shape-secondary"
          />
        </Col>
      </>
    );
  }
};

const mapStateToProps = function (state) {
  return {
    data: state.data,
  };
};

export default connect(mapStateToProps)(PlateauGeneralInfo);
