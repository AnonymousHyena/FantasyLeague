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

export const EpisodeGeneralInfo = ({ selectedEpisode, ...props }) => {
  if (props.data[0]) {
    const groupedData = utils.groupByProperty(props.data, "episode");

    let contestantFirst = groupedData[selectedEpisode].filter(
      (element) =>
        element["source"] === "firstPlace" || element["source"] === "GNTM"
    );
    const result = [];
    if (contestantFirst.length > 0) {
      contestantFirst.forEach((element) => {
        result.push(element["contestant"]);
      });
      contestantFirst = result.join(" / ");
    } else {
      contestantFirst = " - ";
    }

    const groupedDataContestant = utils.groupByProperty(
      groupedData[selectedEpisode],
      "contestant"
    );
    const contestants = Object.keys(groupedDataContestant);
    const contestantPoints = {};
    contestants.map(
      (contestant) =>
        (contestantPoints[contestant] = utils.sumPoints(
          groupedDataContestant,
          contestant
        ))
    );
    let arr = Object.values(contestantPoints);
    let max = Math.max(...arr);
    const contestantMostPoints = contestants
      .filter((contestant) => contestantPoints[contestant] === max)
      .join(" / ");

    let contestantLeave = Object.keys(
      utils.groupByProperty(
        groupedData[selectedEpisode].filter(
          (element) =>
            element["source"] === "quit" ||
            element["source"] === "left" ||
            element["source"] === "lastPlace" ||
            element["source"] === "lastPlaceTop5"
        ),
        "contestant"
      )
    ).join(" / ");

    return (
      <>
        <Col xs={12} lg={4} className="mt-1 mb-1 mt-lg-2 mb-lg-4 d-block">
          <CounterWidget
            category="Πρώτη Θέση"
            title={contestantFirst}
            icon={faRankingStar}
            iconColor="shape-secondary"
          />
        </Col>
        <Col xs={12} lg={4} className="mt-1 mb-1 mt-lg-2 mb-lg-4 d-block">
          <CounterWidget
            category="Περισσότεροι Πόντοι"
            title={contestantMostPoints}
            icon={faPiggyBank}
            iconColor="shape-secondary"
          />
        </Col>
        <Col xs={12} lg={4} className="mt-1 mb-1 mt-lg-2 mb-lg-4 d-block">
          <CounterWidget
            category="Αποχώρηση"
            title={contestantLeave}
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

export default connect(mapStateToProps)(EpisodeGeneralInfo);
