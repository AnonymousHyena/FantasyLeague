import React, { useState } from "react";
import { Col, Row, Form, Card } from "react-bootstrap";
import { connect } from "react-redux";
import * as utils from "../../utils";
import EpisodeGeneralInfo from "../../components/EpisodeGeneralInfo";
import EpisodeBreakdown from "../../components/EpisodeBreakdown";
import EpisodeBreakdownCompact from "../../components/EpisodeBreakdownCompact";

const Episodes = (props) => {
  const episodes = utils.getEpisodes();
  const [selectedEpisode, setSelectedEpisode] = useState(
    episodes[episodes.length - 1]
  );

  return (
    <>
      <Row className="justify-content-center d-block">
        <Col xs={12} className="mt-1 mb-1 mt-lg-2 mb-lg-4">
          <Card>
            <Card.Header className="border-bottom border-light">
              <h5 className="mb-0">Επιλογή Επεισοδίου</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col xs={12} className="mb-3 mt-3">
                  <Form>
                    <Form.Group>
                      <Form.Select
                        onChange={(event) =>
                          setSelectedEpisode(event.target.value)
                        }
                      >
                        {episodes &&
                          episodes
                            .sort()
                            .reverse()
                            .map((episode) => (
                              <option
                                key={utils.translateEpisodes(episode)}
                                value={episode}
                              >
                                {utils.translateEpisodes(episode)}
                              </option>
                            ))}
                      </Form.Select>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {selectedEpisode !== "" && (
        <>
          <Row className="justify-content-md-center">
            <EpisodeGeneralInfo selectedEpisode={selectedEpisode} />
          </Row>

          <Row>
            <EpisodeBreakdown selectedEpisode={selectedEpisode} />
          </Row>

          <Row>
            <EpisodeBreakdownCompact selectedEpisode={selectedEpisode} />
          </Row>
        </>
      )}
    </>
  );
};

const mapStateToProps = function (state) {
  return {
    data: state.data,
  };
};

export default connect(mapStateToProps)(Episodes);
