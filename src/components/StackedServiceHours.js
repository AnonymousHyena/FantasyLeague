import React from "react";
import { Card } from "@themesberg/react-bootstrap";
import { connect } from "react-redux";
import * as d3 from "d3";
import { useD3 } from "./UseD3";

import * as utils from "../utils";

export const StackedServiceHours = (props) => {
  const ref = useD3(
    (svg) => {
      function StackedBarPlot(data) {}
      StackedBarPlot();
    },
    [props.soldier]
  );

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header className="border-bottom border-light">
        <h5 className="mb-0">Stacked services per private</h5>
      </Card.Header>
      <Card.Body>
        <svg ref={ref}></svg>
      </Card.Body>
    </Card>
  );
};

const mapStateToProps = function (state) {
  return {
    data: state.data,
    dates: state.dates,
  };
};

export default connect(mapStateToProps)(StackedServiceHours);
