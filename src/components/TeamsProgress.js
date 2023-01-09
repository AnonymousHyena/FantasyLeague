import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import * as d3 from "d3";
import { useD3 } from "./UseD3";

import * as utils from "../utils";

export const TeamsProgress = (props) => {
  const [isCummulative, setIsCummulative] = useState(true);
  const [activeOptions, setActiveOptions] = useState([true, true, true, true]);
  const teams = utils.getTeams();

  //
  var toggleCummulative = (function () {
    return function () {
      setIsCummulative(!isCummulative);
    };
  })();

  const ref = useD3(
    (svg) => {
      function TeamPointsHistory(data) {
        const color = d3.scaleOrdinal(teams, d3.schemeTableau10);

        var dataset1 = [];
        var dataset2 = [];
        var dataset3 = [];
        var dataset4 = [];

        const groupedData = utils.groupByProperty(data, "episode");

        Object.keys(groupedData).forEach((episode, i) => {
          dataset1.push([
            i + 1,
            utils.sumPoints(
              utils.groupByProperty(groupedData[episode], "team"),
              teams[0]
            ),
          ]);
          dataset2.push([
            i + 1,
            utils.sumPoints(
              utils.groupByProperty(groupedData[episode], "team"),
              teams[1]
            ),
          ]);
          dataset3.push([
            i + 1,
            utils.sumPoints(
              utils.groupByProperty(groupedData[episode], "team"),
              teams[2]
            ),
          ]);
          dataset4.push([
            i + 1,
            utils.sumPoints(
              utils.groupByProperty(groupedData[episode], "team"),
              teams[3]
            ),
          ]);
        });

        if (isCummulative) {
          Object.keys(groupedData).forEach((episode, i) => {
            if (i === 0) {
            } else {
              dataset1[i] = [i + 1, dataset1[i - 1][1] + dataset1[i][1]];
              dataset2[i] = [i + 1, dataset2[i - 1][1] + dataset2[i][1]];
              dataset3[i] = [i + 1, dataset3[i - 1][1] + dataset3[i][1]];
              dataset4[i] = [i + 1, dataset4[i - 1][1] + dataset4[i][1]];
            }
          });
        }

        svg.selectAll("*").remove();
        // set the dimensions and margins of the graph
        var margin = 70,
          width = 600,
          height = 280;

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
          yScale = d3.scaleLinear().domain([-8, 40]).range([height, 0]);

        if (isCummulative) {
          yScale = d3.scaleLinear().domain([0, 350]).range([height, 0]);
        }

        // X label
        svg
          .append("text")
          .attr("x", width / 2)
          .attr("y", height + 30)
          .attr("text-anchor", "middle")
          .style("font-family", "Helvetica")
          .style("font-size", 12)
          .text("Επεισόδιο");

        // Y label
        svg
          .append("text")
          .attr("y", -85)
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

        var line = d3
          .line()
          .x(function (d) {
            return xScale(d[0]);
          })
          .y(function (d) {
            return yScale(d[1]);
          })
          .curve(d3.curveMonotoneX);
        //
        if (activeOptions[0]) {
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
            .style("fill", color(teams[0]));

          svg
            .append("path")
            .datum(dataset1)
            .attr("class", "line")
            .attr("d", line)
            .style("fill", "none")
            .style("stroke", color(teams[0]))
            .style("stroke-width", "2");
        }
        //dataset2
        if (activeOptions[1]) {
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
            .style("fill", color(teams[1]));

          svg
            .append("path")
            .datum(dataset2)
            .attr("class", "line")
            .attr("d", line)
            .style("fill", "none")
            .style("stroke", color(teams[1]))
            .style("stroke-width", "2");
        }
        //dataset3
        if (activeOptions[2]) {
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
            .style("fill", color(teams[2]));

          svg
            .append("path")
            .datum(dataset3)
            .attr("class", "line")
            .attr("d", line)
            .style("fill", "none")
            .style("stroke", color(teams[2]))
            .style("stroke-width", "2");
        }
        //dataset4
        if (activeOptions[3]) {
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
            .style("fill", color(teams[3]));

          svg
            .append("path")
            .datum(dataset4)
            .attr("class", "line")
            .attr("d", line)
            .style("fill", "none")
            .style("stroke", color(teams[3]))
            .style("stroke-width", "2");
        }
        //legend
        svg
          .append("circle")
          .attr("cx", 15)
          .attr("cy", 14)
          .attr("r", 4)
          .style("fill", function () {
            return activeOptions[0] ? color(teams[0]) : "rgba(4,4,4,.5)";
          });

        svg
          .append("circle")
          .attr("cx", 15)
          .attr("cy", 26)
          .attr("r", 4)
          .style("fill", function () {
            return activeOptions[1] ? color(teams[1]) : "rgba(4,4,4,.5)";
          });
        svg
          .append("circle")
          .attr("cx", 15)
          .attr("cy", 38)
          .attr("r", 4)
          .style("fill", function () {
            return activeOptions[2] ? color(teams[2]) : "rgba(4,4,4,.5)";
          });
        svg
          .append("circle")
          .attr("cx", 15)
          .attr("cy", 50)
          .attr("r", 4)
          .style("fill", function () {
            return activeOptions[3] ? color(teams[3]) : "rgba(4,4,4,.5)";
          });

        svg
          .append("text")
          .attr("x", 20)
          .attr("y", 15)
          .text(teams[0])
          .style("font-size", "10px")
          .style("cursor", "pointer")
          .style("fill", function () {
            return activeOptions[0] ? "rgba(0,0,0,1)" : "rgba(4,4,4,.5)";
          })
          .attr("alignment-baseline", "middle")
          .on("click", function () {
            setActiveOptions([
              !activeOptions[0],
              activeOptions[1],
              activeOptions[2],
              activeOptions[3],
            ]);
          });
        svg
          .append("text")
          .attr("x", 20)
          .attr("y", 27)
          .text(teams[1])
          .style("font-size", "10px")
          .style("cursor", "pointer")
          .style("fill", function () {
            return activeOptions[1] ? "rgba(0,0,0,1)" : "rgba(4,4,4,.5)";
          })
          .attr("alignment-baseline", "middle")
          .on("click", function () {
            setActiveOptions([
              activeOptions[0],
              !activeOptions[1],
              activeOptions[2],
              activeOptions[3],
            ]);
          });
        svg
          .append("text")
          .attr("x", 20)
          .attr("y", 39)
          .text(teams[2])
          .style("font-size", "10px")
          .style("cursor", "pointer")
          .style("fill", function () {
            return activeOptions[2] ? "rgba(0,0,0,1)" : "rgba(4,4,4,.5)";
          })
          .attr("alignment-baseline", "middle")
          .on("click", function () {
            setActiveOptions([
              activeOptions[0],
              activeOptions[1],
              !activeOptions[2],
              activeOptions[3],
            ]);
          });
        svg
          .append("text")
          .attr("x", 20)
          .attr("y", 51)
          .text(teams[3])
          .style("font-size", "10px")
          .style("cursor", "pointer")
          .style("fill", function () {
            return activeOptions[3] ? "rgba(0,0,0,1)" : "rgba(4,4,4,.5)";
          })
          .attr("alignment-baseline", "middle")
          .on("click", function () {
            setActiveOptions([
              activeOptions[0],
              activeOptions[1],
              activeOptions[2],
              !activeOptions[3],
            ]);
          });

        svg
          .append("text")
          .attr("x", 13)
          .attr("y", 0)
          .text("Συγκεντρωτικά")
          .style("font-size", "10px")
          .style("font-size", "10px")
          .style("cursor", "pointer")
          .style("fill", function () {
            return isCummulative ? "rgba(0,0,0,1)" : "rgba(4,4,4,.5)";
          })
          .attr("alignment-baseline", "middle")
          .on("click", toggleCummulative);
      }

      TeamPointsHistory(
        props.data.filter((line) => line.sourceType !== "init")
      );
    },
    [props.data.length, isCummulative, activeOptions]
  );

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header className="border-bottom border-light">
        <h5 className="mb-0">Πόντοι Ομάδων ανά Επεισόδιο</h5>
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

export default connect(mapStateToProps)(TeamsProgress);
