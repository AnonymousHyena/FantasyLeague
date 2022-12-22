import React, { useState, useEffect } from "react";
import { Col, Row, Card } from "react-bootstrap";
import { connect } from "react-redux";
import SelectForm from "../../components/SelectForm";
import * as utils from "../../utils";

import store from "../../store";
import PointsSources from "../../components/PointsSources";
import ModelPointsHistoryChart from "../../components/ModelPointsHistoryChart";

const Models = (props) => {
  const models = [...utils.getModels()];
  const [selectedModel, setSelectedModel] = useState(props.model);

  useEffect(() => {
    setSelectedModel(props.model);
  }, [props.model]);

  const setModel = (value) => {
    setSelectedModel(value);
    store.dispatch({
      type: "SET_MODEL",
      payload: value,
    });
  };

  const infoForModel = (model, sourceType = "all", data = props.data) => {
    var modelsData;
    if (sourceType === "all") {
      modelsData = utils.groupByProperty(data, "model");
    } else {
      modelsData = utils.groupByProperty(data, "sourceType")[sourceType];
      modelsData = utils.groupByProperty(modelsData, "model");
    }

    return utils.sumPoints(modelsData, model);
  };

  const getFinalEpisode = (model) => {
    const episodes = utils.getEpisodes();
    const data = utils.groupByProperty(props.data, "episode");
    let i = 0;
    var result = episodes.length;
    while (i < episodes.length) {
      if (i < 9) {
        if (!utils.isInGame(data["episode0" + (i + 1)], model)) {
          result = i + 1;
          break;
        }
      } else {
        if (!utils.isInGame(data["episode" + (i + 1)], model)) {
          result = i + 1;
          break;
        }
      }
      i++;
    }
    i++;
    while (i < episodes.length) {
      if (i < 9) {
        if (utils.cameBack(data["episode0" + (i + 1)], model)) {
          result = episodes.length;
          break;
        }
      } else {
        if (utils.cameBack(data["episode" + (i + 1)], model)) {
          result = episodes.length;
          break;
        }
      }
      i++;
    }
    i++;
    while (i < episodes.length) {
      if (i < 9) {
        if (!utils.isInGame(data["episode0" + (i + 1)], model)) {
          result = i + 1;
          break;
        }
      } else {
        if (!utils.isInGame(data["episode" + (i + 1)], model)) {
          result = i + 1;
          break;
        }
      }
      i++;
    }
    return "episode" + result;
  };

  const dataByType = utils.groupByProperty(props.data, "sourceType");

  const makeAchievementsTable = (selectedModel) => {
    const result = [];
    if (utils.achievements[selectedModel]) {
      if (utils.achievements[selectedModel].length === 0)
        return (
          <tr>
            <td>-</td>
          </tr>
        );
      utils.achievements[selectedModel].sort((a, b) => {
        if (a.order > b.order) {
          return -1;
        } else if (a.order < b.order) {
          return 1;
        } else {
          return 0;
        }
      });
      utils.achievements[selectedModel].forEach((achievement) => {
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
        options={models}
        setter={setModel}
        def={selectedModel}
        title="Επιλογή Μοντέλου"
      />

      {selectedModel !== "" && (
        <>
          <Row className="justify-content-md-center">
            <Col lg={4} xs={12} className="mt-2 mb-4 d-block">
              <Card>
                <div className="crop">
                  <img
                    data-src={
                      "https://www.star.gr/tv/images/287x382/jpg/files/gntm5/diagonizomenes/" +
                      utils.modelStarNames[selectedModel] +
                      ".webp"
                    }
                    alt={utils.modelStarNames[selectedModel]}
                    className="lazy"
                    src={
                      "https://www.star.gr/tv/images/287x382/jpg/files/gntm5/diagonizomenes/" +
                      utils.modelStarNames[selectedModel] +
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
                      {utils.modelFullNames[selectedModel]}
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <table className="">
                      <tbody>
                        <tr className="">
                          <th className="">Ομάδα</th>
                          <td className="text-right">
                            "{utils.getModelTeam(selectedModel)}"
                          </td>
                          <th className="ps-5">Τελευταίο Επεισόδιο</th>
                          <td className="text-right">
                            {utils.translateEpisodes(
                              getFinalEpisode(selectedModel)
                            )}
                          </td>
                        </tr>
                        <tr className="">
                          <th className="">Γενική Κατάταξη</th>
                          <td className="text-right">
                            #
                            {utils.getModelRank(
                              props.data,
                              "total",
                              selectedModel
                            )}
                          </td>
                          <th className="ps-5">Συνολικοί Πόντοι</th>
                          <td className="text-right">
                            {infoForModel(selectedModel)}
                          </td>
                        </tr>
                        <tr className="">
                          <th className="">(Placement, Drama, Misc)</th>
                          <td className="text-right">
                            #
                            {utils.getModelRank(
                              dataByType["placement"],
                              "placement",
                              selectedModel
                            )}{" "}
                            #
                            {utils.getModelRank(
                              dataByType["drama"],
                              "drama",
                              selectedModel
                            )}{" "}
                            #
                            {utils.getModelRank(
                              dataByType["misc"],
                              "misc",
                              selectedModel
                            )}
                          </td>
                          <th className="ps-5">(Placement, Drama, Misc)</th>
                          <td className="text-right">
                            {infoForModel(selectedModel, "placement")}
                            {", "}
                            {infoForModel(selectedModel, "drama")}
                            {", "}
                            {infoForModel(selectedModel, "misc")}
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
                      {utils.modelFullNames[selectedModel]}
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <table className="">
                      <tbody>
                        <tr className="">
                          <th className="w-50">Ομάδα</th>
                          <td className="text-right">
                            "{utils.getModelTeam(selectedModel)}"
                          </td>
                        </tr>
                        <tr className="">
                          <th className="w-50">Γενική Κατάταξη</th>
                          <td className="text-right">
                            #
                            {utils.getModelRank(
                              props.data,
                              "total",
                              selectedModel
                            )}
                          </td>
                        </tr>
                        <tr className="">
                          <th className="w-50">(Placement, Drama, Misc)</th>
                          <td className="text-right">
                            #
                            {utils.getModelRank(
                              dataByType["placement"],
                              "placement",
                              selectedModel
                            )}{" "}
                            #
                            {utils.getModelRank(
                              dataByType["drama"],
                              "drama",
                              selectedModel
                            )}{" "}
                            #
                            {utils.getModelRank(
                              dataByType["misc"],
                              "misc",
                              selectedModel
                            )}
                          </td>
                        </tr>
                        <tr className="">
                          <th className="w-50">Συνολικοί Πόντοι</th>
                          <td className="text-right">
                            {infoForModel(selectedModel)}
                          </td>
                        </tr>
                        <tr className="">
                          <th className="w-50">(Placement, Drama, Misc)</th>
                          <td className="text-right">
                            {infoForModel(selectedModel, "placement")}{" "}
                            {infoForModel(selectedModel, "drama")}{" "}
                            {infoForModel(selectedModel, "misc")}
                          </td>
                        </tr>
                        <tr className="">
                          <th className="w-50">Τελευταίο Επεισόδιο</th>
                          <td className="text-right">
                            {utils.translateEpisodes(
                              getFinalEpisode(selectedModel)
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
                    <h5 className="mb-0">Achievements Μοντέλου</h5>
                  </Card.Header>
                  <Card.Body>
                    <table className="w-100">
                      <tbody>{makeAchievementsTable(selectedModel)}</tbody>
                    </table>
                  </Card.Body>
                </Card>
              </Col>
            </Col>
          </Row>

          <Row className="justify-content-md-center">
            <Col xs={12} className="mt-1 mb-1 mt-lg-2 mb-lg-4 d-block">
              <PointsSources selectedModel={selectedModel} />
            </Col>
          </Row>

          <Row className="justify-content-md-center">
            <Col xs={12} className="mt-1 mb-1 mt-lg-2 mb-lg-4 d-block">
              <ModelPointsHistoryChart selectedModel={selectedModel} />
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
    model: state.model,
  };
};

export default connect(mapStateToProps)(Models);
