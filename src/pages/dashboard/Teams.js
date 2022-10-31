import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import * as utils from "../../utils";

import TeamBreakdown from "../../components/TeamBreakdown";
import TeamBreakdownCompact from "../../components/TeamBreakdownCompact";
import SelectForm from "../../components/SelectForm";

import store from "../../store";

export const Teams = (props) => {
  const [selectedTeam, setSelectedTeam] = useState(props.team);
  const teams = [...utils.getTeams()];

  useEffect(() => {
    setSelectedTeam(props.team);
  }, [props.team]);

  const setTeam = (value) => {
    setSelectedTeam(value);
    store.dispatch({
      type: "SET_TEAM",
      payload: value,
    });
  };

  return (
    <>
      <SelectForm
        options={teams}
        setter={setTeam}
        def={selectedTeam}
        title="Επιλογή Ομάδας"
      />

      {selectedTeam !== "" && (
        <>
          <Row className="justify-content-lg-center d-none d-lg-block">
            <Col xs={12} className="mt-2 mb-4">
              <TeamBreakdown selectedTeam={selectedTeam} />
            </Col>
          </Row>

          <Row className="justify-content-lg-center d-block d-lg-none">
            <Col xs={12} className="mt-2 mb-4">
              <TeamBreakdownCompact selectedTeam={selectedTeam} />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

const mapStateToProps = function (state) {
  return {
    team: state.team,
  };
};

export default connect(mapStateToProps)(Teams);
