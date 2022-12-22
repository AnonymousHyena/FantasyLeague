import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import * as d3 from "d3";
import { useD3 } from "./UseD3";

import * as utils from "../utils";

export const TeamPlayersPointsHistoryChart = ({ selectedTeam, ...props }) => {
  const [isCummulative, setIsCummulative] = useState(true);

  const [activeOptions, setActiveOptions] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ]);

  //
  var toggleCummulative = (function () {
    return function () {
      setIsCummulative(!isCummulative);
    };
  })();

  const ref = useD3(
    (svg) => {
      function TeamPointsHistory(data) {
        const datasets = [];

        const groupedData = utils.groupByProperty(data, "episode");
        const contestants = Object.keys(
          utils.groupByProperty(data, "contestant")
        );
        const color = d3.scaleOrdinal(contestants, d3.schemeTableau10);
        contestants.forEach((contestant) => {
          datasets.push([]);
        });

        Object.keys(groupedData).forEach((episode, i) => {
          contestants.forEach((contestant, j) => {
            datasets[j].push([
              i + 1,
              utils.sumPoints(
                utils.groupByProperty(groupedData[episode], "contestant"),
                contestant
              ),
            ]);
          });
        });

        if (isCummulative) {
          Object.keys(groupedData).forEach((episode, i) => {
            if (i === 0) {
            } else {
              datasets.forEach((dataset) => {
                dataset[i] = [i + 1, dataset[i - 1][1] + dataset[i][1]];
              });
            }
          });
        }

        svg.selectAll("*").remove();
        // set the dimensions and margins of the graph
        var margin = 60,
          width = 600,
          height = 250;

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
          yScale = d3.scaleLinear().domain([-8, 20]).range([height, 0]);

        if (isCummulative) {
          yScale = d3.scaleLinear().domain([-10, 120]).range([height, 0]);
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
        var length = [];
        for (var j = 0; j < contestants.length; j++) {
          length.push(contestants[j].length * 4 + 25);
        }
        contestants.forEach((contestant, i) => {
          if (activeOptions[i]) {
            svg
              .append("g")
              .selectAll("dot")
              .data(datasets[i])
              .enter()
              .append("circle")
              .attr("cx", function (d) {
                return xScale(d[0]);
              })
              .attr("cy", function (d) {
                return yScale(d[1]);
              })
              .attr("r", 2)
              .style("fill", color(contestant));

            svg
              .append("path")
              .datum(datasets[i])
              .attr("class", "line")
              .attr("d", line)
              .style("fill", "none")
              .style("stroke", color(contestant))
              .style("stroke-width", "2");
          }

          //legend
          var finalLength = 0;
          for (var j = 0; j < i; j++) {
            finalLength += length[j];
          }
          svg
            .append("circle")
            .attr("cx", 15 + finalLength)
            .attr("cy", 14)
            .attr("r", 4)
            .style("fill", function () {
              return activeOptions[0] ? color(contestant) : "rgba(4,4,4,.5)";
            });
          svg
            .append("text")
            .attr("x", 20 + finalLength)
            .attr("y", 15)
            .text(contestant)
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
        });

        //legend
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
        props.data.filter(
          (line) => line.team === selectedTeam && line.sourceType !== "init"
        )
      );
    },
    [props.data.length, selectedTeam, isCummulative, activeOptions]
  );

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header className="border-bottom border-light">
        <h5 className="mb-0">
          Πόντοι Διαγωνιζόμενων Όμάδας "{selectedTeam}" ανά Επεισόδιο
        </h5>
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

export default connect(mapStateToProps)(TeamPlayersPointsHistoryChart);
