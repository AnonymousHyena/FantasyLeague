import React from "react";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import * as d3 from "d3";
import { useD3 } from "./UseD3";

export const TeamPointsBreakdownPie = ({ selectedTeam, ...props }) => {
  const ref = useD3(
    (svg) => {
      function PieServices(data) {
        const color = d3.scaleOrdinal(
          ["placement", ",misc", "drama"],
          d3.schemeTableau10
        );
        svg.selectAll("*").remove();
        // set the dimensions and margins of the graph
        var margin = 20,
          width = 600,
          height = 600;

        var radius = Math.min(width, height) / 2 - margin;

        // append the svg object to the body of the page
        var g = svg
          .attr("viewBox", [0, 0, width, height])
          .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var pie = d3.pie();

        const pie_data = data.reduce((pie_data, element) => {
          pie_data[element.sourceType] =
            (pie_data[element.sourceType] || 0) + element.points;
          return pie_data;
        }, {});
        pie_data["drama"] = -pie_data["drama"];
        const pie_data_labels = {
          placement: "Placement",
          drama: "Drama",
          misc: "Misc",
        };

        var arc = d3.arc().innerRadius(0).outerRadius(radius);
        var label = d3
          .arc()
          .outerRadius(radius)
          .innerRadius(radius - 50);

        var arcs = g
          .selectAll(".arc")
          .data(pie(Object.values(pie_data)))
          .enter()
          .append("g")
          .attr("class", "arc");

        //Draw arc paths
        arcs
          .append("path")
          .attr("fill", function (d, i) {
            return color(Object.keys(pie_data)[i]);
          })
          .attr("d", arc);

        arcs
          .append("text")
          .attr("dy", ".35em")
          .attr("text-anchor", function (d) {
            return d.endAngle < Math.PI ? "end" : "start";
          })
          .attr("transform", function (d) {
            var midAngle =
              d.endAngle < Math.PI
                ? d.startAngle / 2 + d.endAngle / 2
                : d.startAngle / 2 + d.endAngle / 2 + Math.PI;

            return (
              "translate(" +
              label.centroid(d) +
              ") rotate(-90) rotate(" +
              (midAngle * 180) / Math.PI +
              ")"
            );
          })
          .text(function (d, i) {
            pie_data["drama"] = -pie_data["drama"];
            return (
              pie_data_labels[Object.keys(pie_data)[i]] +
              " (" +
              Object.values(pie_data)[i] +
              ")"
            );
          })
          .style("font-size", 20);
      }

      PieServices(
        props.data.filter(
          (line) => line.team === selectedTeam && line.sourceType !== "init"
        )
      );
    },
    [props.data.length, selectedTeam]
  );

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header className="border-bottom border-light">
        <h5 className="mb-0">Points Breakdown</h5>
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
  };
};

export default connect(mapStateToProps)(TeamPointsBreakdownPie);
