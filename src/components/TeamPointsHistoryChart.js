import React from "react";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import * as d3 from "d3";
import { useD3 } from "./UseD3";

import * as utils from "../utils";

export const TeamPointsHistoryChart = ({ selectedTeam, ...props }) => {
  const ref = useD3(
    (svg) => {
      function TeamPointsHistory(data) {
        const color = d3.scaleOrdinal(
          ["placement", ",misc", "drama"],
          d3.schemeTableau10
        );

        var dataset1 = [];
        var dataset2 = [];
        var dataset3 = [];
        var dataset4 = [];

        const groupedData = utils.groupByProperty(data, "plateau");

        Object.keys(groupedData).forEach((plateau, i) => {
          dataset1.push([i + 1, utils.sumPoints(groupedData, plateau)]);
          dataset2.push([
            i + 1,
            utils.sumPoints(
              utils.groupByProperty(groupedData[plateau], "sourceType"),
              "placement"
            ),
          ]);
          dataset3.push([
            i + 1,
            utils.sumPoints(
              utils.groupByProperty(groupedData[plateau], "sourceType"),
              "drama"
            ),
          ]);
          dataset4.push([
            i + 1,
            utils.sumPoints(
              utils.groupByProperty(groupedData[plateau], "sourceType"),
              "misc"
            ),
          ]);
        });

        svg.selectAll("*").remove();
        // set the dimensions and margins of the graph
        var margin = 60,
          width = 600,
          height = 200;

        // append the svg object to the body of the page
        var g = svg
          .attr("viewBox", [
            -margin / 2,
            -10,
            width + margin,
            height + margin - 12,
          ])
          .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var xScale = d3
            .scaleLinear()
            .domain([1, Object.keys(groupedData).length])
            .range([0, width]),
          yScale = d3.scaleLinear().domain([-10, 25]).range([height, 0]);

        // X label
        svg
          .append("text")
          .attr("x", width / 2)
          .attr("y", height + 30)
          .attr("text-anchor", "middle")
          .style("font-family", "Helvetica")
          .style("font-size", 12)
          .text("Πλατό");

        // Y label
        svg
          .append("text")
          .attr("y", -80)
          .attr("text-anchor", "middle")
          .attr("transform", "translate(60," + height / 2 + ")rotate(-90)")
          .style("font-family", "Helvetica")
          .style("font-size", 12)
          .text("Πόντοι");

        svg
          .append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(xScale));

        svg.append("g").call(d3.axisLeft(yScale));

        svg
          .append("g")
          .selectAll("dot")
          .data(dataset1)
          .enter()
          .append("circle")
          .attr("cx", function (d) {
            return xScale(d[0]);
          })
          .attr("cy", function (d) {
            return yScale(d[1]);
          })
          .attr("r", 2)
          .style("fill", "#oo0000");

        var line = d3
          .line()
          .x(function (d) {
            return xScale(d[0]);
          })
          .y(function (d) {
            return yScale(d[1]);
          })
          .curve(d3.curveMonotoneX);

        svg
          .append("path")
          .datum(dataset1)
          .attr("class", "line")
          .attr("d", line)
          .style("fill", "none")
          .style("stroke", "#000000")
          .style("stroke-width", "2");

        //dataset2
        svg
          .append("g")
          .selectAll("dot")
          .data(dataset2)
          .enter()
          .append("circle")
          .attr("cx", function (d) {
            return xScale(d[0]);
          })
          .attr("cy", function (d) {
            return yScale(d[1]);
          })
          .attr("r", 2)
          .style("fill", color("placement"));

        svg
          .append("path")
          .datum(dataset2)
          .attr("class", "line")
          .attr("d", line)
          .style("fill", "none")
          .style("stroke", color("placement"))
          .style("stroke-width", "2");

        //dataset3
        svg
          .append("g")
          .selectAll("dot")
          .data(dataset3)
          .enter()
          .append("circle")
          .attr("cx", function (d) {
            return xScale(d[0]);
          })
          .attr("cy", function (d) {
            return yScale(d[1]);
          })
          .attr("r", 2)
          .style("fill", color("drama"));

        svg
          .append("path")
          .datum(dataset3)
          .attr("class", "line")
          .attr("d", line)
          .style("fill", "none")
          .style("stroke", color("drama"))
          .style("stroke-width", "2");

        //dataset4
        svg
          .append("g")
          .selectAll("dot")
          .data(dataset4)
          .enter()
          .append("circle")
          .attr("cx", function (d) {
            return xScale(d[0]);
          })
          .attr("cy", function (d) {
            return yScale(d[1]);
          })
          .attr("r", 2)
          .style("fill", color("misc"));

        svg
          .append("path")
          .datum(dataset4)
          .attr("class", "line")
          .attr("d", line)
          .style("fill", "none")
          .style("stroke", color("misc"))
          .style("stroke-width", "2");

        //legend
        svg
          .append("circle")
          .attr("cx", 525)
          .attr("cy", 0)
          .attr("r", 5)
          .style("fill", "#000");
        svg
          .append("circle")
          .attr("cx", 525)
          .attr("cy", 20)
          .attr("r", 5)
          .style("fill", color("placement"));
        svg
          .append("circle")
          .attr("cx", 525)
          .attr("cy", 40)
          .attr("r", 5)
          .style("fill", color("drama"));
        svg
          .append("circle")
          .attr("cx", 525)
          .attr("cy", 60)
          .attr("r", 5)
          .style("fill", color("misc"));

        svg
          .append("text")
          .attr("x", 540)
          .attr("y", 0)
          .text("Total")
          .style("font-size", "12px")
          .attr("alignment-baseline", "middle");
        svg
          .append("text")
          .attr("x", 540)
          .attr("y", 20)
          .text("Placement")
          .style("font-size", "12px")
          .attr("alignment-baseline", "middle");
        svg
          .append("text")
          .attr("x", 540)
          .attr("y", 40)
          .text("Drama")
          .style("font-size", "12px")
          .attr("alignment-baseline", "middle");
        svg
          .append("text")
          .attr("x", 540)
          .attr("y", 60)
          .text("Misc")
          .style("font-size", "12px")
          .attr("alignment-baseline", "middle");
      }

      TeamPointsHistory(
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
        <h5 className="mb-0">Πόντοι ανά Πλατό</h5>
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

export default connect(mapStateToProps)(TeamPointsHistoryChart);
