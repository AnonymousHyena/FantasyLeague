import React, { useState, useEffect } from "react";
import { Col, Row, Card } from "react-bootstrap";
import { connect } from "react-redux";
import SelectForm from "../../components/SelectForm";
import * as utils from "../../utils";

import store from "../../store";

const Models = (props) => {
  const models = [...utils.getModels()];
  const [selectedModel, setSelectedModel] = useState(props.model);
  const [selectedModelPlateau, setSelectedModelPlateau] = useState("plateau1");

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

  const infoForModelByPlateau = (model, plateau, sourceType = "all") => {
    const plateauData = utils.groupByProperty(props.data, "plateau")[plateau];
    return infoForModel(model, sourceType, plateauData);
  };

  const getFinalPlateau = (model) => {
    const plateaus = utils.getPlateaus();
    const data = utils.groupByProperty(props.data, "plateau");
    let i = 0;
    while (i < plateaus.length) {
      if (!utils.isInGame(data["plateau" + (i + 1)], model)) {
        // setSelectedModelPlateau("plateau" + (i + 1));
        return "plateau" + (i + 1);
      }
      i++;
    }
    // setSelectedModelPlateau("plateau" + i);
    return "plateau" + i;
  };

  const makePlateauList = (model) => {
    const results = [];
    const plateaus = utils.getPlateaus();
    const data = utils.groupByProperty(props.data, "plateau");
    let i = 0;
    while (i < plateaus.length) {
      results.push("plateau" + (i + 1));
      if (!utils.isInGame(data["plateau" + (i + 1)], model)) {
        break;
      }
      i++;
    }
    return results;
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
          <Row className="justify-content-md-left">
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

            <Col xs={12} lg={8} className="d-flex flex-wrap">
              <Col xs={12} className="mt-2">
                <Card className="p-2">
                  <Card.Header>
                    <h5 className="mb-0">
                      {utils.modelFullNames[selectedModel]}
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    Ομάδα: "{utils.getModelTeam(selectedModel)}"
                    <br />
                    Γενική Κατάταξη: #
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} lg={6} className="mt-2 pe-3">
                <Card className="p-2">
                  <Card.Header>
                    <h5 className="mb-0">Πόντοι Μοντέλου</h5>
                  </Card.Header>
                  <Card.Body>
                    <table className="">
                      <tbody>
                        <tr className="">
                          <th className="w-75">Total Points</th>
                          <td className="text-right">
                            {infoForModel(selectedModel)}
                          </td>
                        </tr>
                        <tr>
                          <th className="w-75">Placement Points</th>
                          <td className="text-right">
                            {infoForModel(selectedModel, "placement")}
                          </td>
                        </tr>
                        <tr>
                          <th className="w-75">Drama Points</th>
                          <td className="text-right">
                            {infoForModel(selectedModel, "drama")}
                          </td>
                        </tr>
                        <tr>
                          <th className="w-75">Misc Points</th>
                          <td className="text-right">
                            {infoForModel(selectedModel, "misc")}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} lg={6} className="mt-2 ps-3">
                <Card className="p-2">
                  <Card.Header>
                    <h5 className="mb-0">
                      Τελευταίο Πλατό: "
                      {utils.translatePlateaus(getFinalPlateau(selectedModel))}"
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <table className="">
                      <tbody>
                        <tr>
                          <th className="w-75">Total Points</th>
                          <td className="text-right">
                            {infoForModelByPlateau(
                              selectedModel,
                              getFinalPlateau(selectedModel)
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th className="w-75">Placement Points</th>
                          <td className="text-right">
                            {infoForModelByPlateau(
                              selectedModel,
                              getFinalPlateau(selectedModel),
                              "placement"
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th className="w-75">Drama Points</th>
                          <td className="text-right">
                            {infoForModelByPlateau(
                              selectedModel,
                              getFinalPlateau(selectedModel),
                              "drama"
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th className="w-75">Misc Points</th>
                          <td className="text-right">
                            {infoForModelByPlateau(
                              selectedModel,
                              getFinalPlateau(selectedModel),
                              "misc"
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Card.Body>
                </Card>
              </Col>

              {/* <Col xs={12} className="mb-4" >
                <SelectForm
                  options={makePlateauList(selectedModel)}
                  setter={setSelectedModelPlateau}
                  def={selectedModelPlateau}
                  title="Επιλογή Πλατό"
                />
              </Col> */}
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
