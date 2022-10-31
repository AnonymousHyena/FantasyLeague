import React, { useState, useEffect } from "react";
import { Col, Row, Card } from "react-bootstrap";
import { connect } from "react-redux";
import SelectForm from "../../components/SelectForm";
import * as utils from "../../utils";

import store from "../../store";

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
        return "plateau" + (i + 1);
      }
      i++;
    }
    return "plateau" + i;
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
                <img
                  data-src={
                    "https://www.star.gr/tv/images/287x382/jpg/files/gntm5/diagonizomenes/" +
                    utils.modelStarNames[selectedModel] +
                    ".webp"
                  }
                  alt={utils.modelStarNames[selectedModel]}
                  class="lazy"
                  src={
                    "https://www.star.gr/tv/images/287x382/jpg/files/gntm5/diagonizomenes/" +
                    utils.modelStarNames[selectedModel] +
                    ".webp"
                  }
                  width="auto"
                  height="auto"
                />
              </Card>
            </Col>

            <Col xs={12} lg={4} className="mt-2 mb-4 d-block">
              <Card className="p-2">
                <Card.Header>
                  <h5 className="mb-0">Πόντοι Μοντέλου</h5>
                </Card.Header>
                <Card.Body>
                  <table className="">
                    <tr>
                      <th>Total Points</th>
                      <tb>{infoForModel(selectedModel)}</tb>
                    </tr>
                    <tr>
                      <th>Placement Points</th>
                      <tb>{infoForModel(selectedModel, "placement")}</tb>
                    </tr>
                    <tr>
                      <th>Drama Points</th>
                      <tb>{infoForModel(selectedModel, "drama")}</tb>
                    </tr>
                    <tr>
                      <th>Misc Points</th>
                      <tb>{infoForModel(selectedModel, "misc")}</tb>
                    </tr>
                  </table>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} lg={4} className="mt-2 mb-4 d-block">
              <Card className="p-2">
                <Card.Header>
                  <h5 className="mb-0">
                    {" "}
                    Τελευταίο Πλατό: "
                    {utils.translatePlateaus(getFinalPlateau(selectedModel))}"
                  </h5>
                </Card.Header>
                <Card.Body>
                  <table className="">
                    <tr>
                      <th>Total Points</th>
                      <tb>
                        {infoForModelByPlateau(
                          selectedModel,
                          getFinalPlateau(selectedModel)
                        )}
                      </tb>
                    </tr>
                    <tr>
                      <th>Placement Points</th>
                      <tb>
                        {infoForModelByPlateau(
                          selectedModel,
                          getFinalPlateau(selectedModel),
                          "placement"
                        )}
                      </tb>
                    </tr>
                    <tr>
                      <th>Drama Points</th>
                      <tb>
                        {infoForModelByPlateau(
                          selectedModel,
                          getFinalPlateau(selectedModel),
                          "drama"
                        )}
                      </tb>
                    </tr>
                    <tr>
                      <th>Misc Points</th>
                      <tb>
                        {infoForModelByPlateau(
                          selectedModel,
                          getFinalPlateau(selectedModel),
                          "misc"
                        )}
                      </tb>
                    </tr>
                  </table>
                </Card.Body>
              </Card>
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
