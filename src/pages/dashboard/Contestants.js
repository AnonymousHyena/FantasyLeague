import React, { useState, useEffect } from "react";
import { Col, Row, Card } from "react-bootstrap";
import { connect } from "react-redux";
import SelectForm from "../../components/SelectForm";
import * as utils from "../../utils";

import store from "../../store";
import PointsSources from "../../components/PointsSources";
import ContestantPointsHistoryChart from "../../components/ContestantPointsHistoryChart";

const Contestants = (props) => {
  const contestants = [...utils.getContestants()];
  const [selectedContestant, setSelectedContestant] = useState(
    props.contestant
  );

  useEffect(() => {
    setSelectedContestant(props.contestant);
  }, [props.contestant]);

  const setContestant = (value) => {
    setSelectedContestant(value);
    store.dispatch({
      type: "SET_CONTESTANT",
      payload: value,
    });
  };

  const infoForContestant = (
    contestant,
    sourceType = "all",
    data = props.data
  ) => {
    var contestantsData;
    if (sourceType === "all") {
      contestantsData = utils.groupByProperty(data, "contestant");
    } else {
      contestantsData = utils.groupByProperty(data, "sourceType")[sourceType];
      contestantsData = utils.groupByProperty(contestantsData, "contestant");
    }

    return utils.sumPoints(contestantsData, contestant);
  };

  const getFinalEpisode = (contestant) => {
    const episodes = utils.getEpisodes();
    const data = utils.groupByProperty(props.data, "episode");
    let i = 0;
    var result = episodes.length;
    while (i < episodes.length) {
      if (i < 9) {
        if (!utils.isInGame(data["episode0" + (i + 1)], contestant)) {
          result = i + 1;
          break;
        }
      } else {
        if (!utils.isInGame(data["episode" + (i + 1)], contestant)) {
          result = i + 1;
          break;
        }
      }
      i++;
    }
    i++;
    while (i < episodes.length) {
      if (i < 9) {
        if (utils.cameBack(data["episode0" + (i + 1)], contestant)) {
          result = episodes.length;
          break;
        }
      } else {
        if (utils.cameBack(data["episode" + (i + 1)], contestant)) {
          result = episodes.length;
          break;
        }
      }
      i++;
    }
    i++;
    while (i < episodes.length) {
      if (i < 9) {
        if (!utils.isInGame(data["episode0" + (i + 1)], contestant)) {
          result = i + 1;
          break;
        }
      } else {
        if (!utils.isInGame(data["episode" + (i + 1)], contestant)) {
          result = i + 1;
          break;
        }
      }
      i++;
    }
    return "episode" + result;
  };

  const dataByType = utils.groupByProperty(props.data, "sourceType");

  const makeAchievementsTable = (selectedContestant) => {
    const result = [];
    if (utils.achievements[selectedContestant]) {
      if (utils.achievements[selectedContestant].length === 0)
        return (
          <tr>
            <td>-</td>
          </tr>
        );
      utils.achievements[selectedContestant].sort((a, b) => {
        if (a.order > b.order) {
          return -1;
        } else if (a.order < b.order) {
          return 1;
        } else {
          return 0;
        }
      });
      utils.achievements[selectedContestant].forEach((achievement) => {
        result.push(
          <tr>
            <th className="w-25">{achievement.name}</th>
            <td className="w-75">{achievement.description}</td>
          </tr>
        );
      });
      return result;
    }
  };

  return (
    <>
      <SelectForm
        options={contestants}
        setter={setContestant}
        def={selectedContestant}
        title="Επιλογή Διαγωνιζόμενου"
      />

      {selectedContestant !== "" && (
        <>
          <Row className="justify-content-md-center">
            <Col lg={4} xs={12} className="mt-2 mb-4 d-block">
              <Card>
                <div className="crop">
                  <img
                    data-src={
                      "https://www.star.gr/tv/images/287x382/jpg/files/gntm5/diagonizomenes/" +
                      utils.contestantStarNames[selectedContestant] +
                      ".webp"
                    }
                    alt={utils.contestantStarNames[selectedContestant]}
                    className="lazy"
                    src={
                      "https://www.star.gr/tv/images/287x382/jpg/files/gntm5/diagonizomenes/" +
                      utils.contestantStarNames[selectedContestant] +
                      ".webp"
                    }
                  />
                </div>
              </Card>
            </Col>

            <Col
              xs={12}
              lg={8}
              className="mt-1 mb-1 mt-lg-0 mb-lg-0 d-flex flex-wrap"
              style={{ height: "fit-content" }}
            >
              <Col xs={12} className="mt-2 d-lg-block d-none">
                <Card className="p-1">
                  <Card.Header>
                    <h5 className="mb-0">
                      {utils.contestantFullNames[selectedContestant]}
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <table className="">
                      <tbody>
                        <tr className="">
                          <th className="">Ομάδα</th>
                          <td className="text-right">
                            "{utils.getContestantTeam(selectedContestant)}"
                          </td>
                          <th className="ps-5">Τελευταίο Επεισόδιο</th>
                          <td className="text-right">
                            {utils.translateEpisodes(
                              getFinalEpisode(selectedContestant)
                            )}
                          </td>
                        </tr>
                        <tr className="">
                          <th className="">Γενική Κατάταξη</th>
                          <td className="text-right">
                            #
                            {utils.getContestantRank(
                              props.data,
                              "total",
                              selectedContestant
                            )}
                          </td>
                          <th className="ps-5">Συνολικοί Πόντοι</th>
                          <td className="text-right">
                            {infoForContestant(selectedContestant)}
                          </td>
                        </tr>
                        <tr className="">
                          <th className="">(Placement, Drama, Misc)</th>
                          <td className="text-right">
                            #
                            {utils.getContestantRank(
                              dataByType["placement"],
                              "placement",
                              selectedContestant
                            )}{" "}
                            #
                            {utils.getContestantRank(
                              dataByType["drama"],
                              "drama",
                              selectedContestant
                            )}{" "}
                            #
                            {utils.getContestantRank(
                              dataByType["misc"],
                              "misc",
                              selectedContestant
                            )}
                          </td>
                          <th className="ps-5">(Placement, Drama, Misc)</th>
                          <td className="text-right">
                            {infoForContestant(selectedContestant, "placement")}
                            {", "}
                            {infoForContestant(selectedContestant, "drama")}
                            {", "}
                            {infoForContestant(selectedContestant, "misc")}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} className="mt-2 d-block d-lg-none">
                <Card className="p-1">
                  <Card.Header>
                    <h5 className="mb-0">
                      {utils.contestantFullNames[selectedContestant]}
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <table className="">
                      <tbody>
                        <tr className="">
                          <th className="w-50">Ομάδα</th>
                          <td className="text-right">
                            "{utils.getContestantTeam(selectedContestant)}"
                          </td>
                        </tr>
                        <tr className="">
                          <th className="w-50">Γενική Κατάταξη</th>
                          <td className="text-right">
                            #
                            {utils.getContestantRank(
                              props.data,
                              "total",
                              selectedContestant
                            )}
                          </td>
                        </tr>
                        <tr className="">
                          <th className="w-50">(Placement, Drama, Misc)</th>
                          <td className="text-right">
                            #
                            {utils.getContestantRank(
                              dataByType["placement"],
                              "placement",
                              selectedContestant
                            )}{" "}
                            #
                            {utils.getContestantRank(
                              dataByType["drama"],
                              "drama",
                              selectedContestant
                            )}{" "}
                            #
                            {utils.getContestantRank(
                              dataByType["misc"],
                              "misc",
                              selectedContestant
                            )}
                          </td>
                        </tr>
                        <tr className="">
                          <th className="w-50">Συνολικοί Πόντοι</th>
                          <td className="text-right">
                            {infoForContestant(selectedContestant)}
                          </td>
                        </tr>
                        <tr className="">
                          <th className="w-50">(Placement, Drama, Misc)</th>
                          <td className="text-right">
                            {infoForContestant(selectedContestant, "placement")}{" "}
                            {infoForContestant(selectedContestant, "drama")}{" "}
                            {infoForContestant(selectedContestant, "misc")}
                          </td>
                        </tr>
                        <tr className="">
                          <th className="w-50">Τελευταίο Επεισόδιο</th>
                          <td className="text-right">
                            {utils.translateEpisodes(
                              getFinalEpisode(selectedContestant)
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} className="mt-2">
                <Card className="p-1 achievement-card">
                  <Card.Header>
                    <h5 className="mb-0">Achievements Διαγωνιζόμενου</h5>
                  </Card.Header>
                  <Card.Body>
                    <table className="w-100">
                      <tbody>{makeAchievementsTable(selectedContestant)}</tbody>
                    </table>
                  </Card.Body>
                </Card>
              </Col>
            </Col>
          </Row>

          <Row className="justify-content-md-center">
            <Col xs={12} className="mt-1 mb-1 mt-lg-2 mb-lg-4 d-block">
              <PointsSources selectedContestant={selectedContestant} />
            </Col>
          </Row>

          <Row className="justify-content-md-center">
            <Col xs={12} className="mt-1 mb-1 mt-lg-2 mb-lg-4 d-block">
              <ContestantPointsHistoryChart
                selectedContestant={selectedContestant}
              />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

const mapStateToProps = function (state) {
  return {
    data: state.data,
    contestant: state.contestant,
  };
};

export default connect(mapStateToProps)(Contestants);
