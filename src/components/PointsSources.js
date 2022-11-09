import React from "react";
import { Card } from "@themesberg/react-bootstrap";
import { connect } from "react-redux";
import * as cloud from "d3-cloud";

import { useD3 } from "./UseD3";

import * as utils from "../utils";

export const PointsSources = ({ selectedModel, ...props }) => {
  const negative = [
    "Αδικήθηκα",
    "Makeover drama",
    "Τελευταία θέση",
    "Bottom 50% με advatnage",
    "Οικειοθελής αποχώρηση",
    "Τραυματισμός",
    "Κράξιμο",
    "Διακοπή ροής της διαδικασίας",
    "Bottom 25%",
  ];
  const ref = useD3(
    (svg) => {
      function makeGraphic(data) {
        svg.selectAll("*").remove();
        // set the dimensions and margins of the graph

        var width = 600,
          height = 200;

        // append the svg object to the body of the page
        svg
          .attr("viewBox", [0, 0, width, height])
          .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        let counter = {};

        data.forEach((line) => {
          counter[utils.pointsTranslateDict[line.source]] =
            (counter[utils.pointsTranslateDict[line.source]] + 2) | 10;
        });

        const myWords = Object.entries(counter).map((e) => ({
          word: e[0],
          size: e[1],
        }));

        var layout = cloud()
          .size([width, height])
          .words(
            myWords.map(function (d) {
              return { text: d.word, size: d.size };
            })
          )
          .padding(5) //space between words
          .rotate(function () {
            return 0;
          })
          // .rotate(function () {
          //   return ~~(Math.random() * 2) * 90;
          // })
          .fontSize(function (d) {
            return d.size;
          }) // font size of words
          .on("end", draw);
        layout.start();

        // This function takes the output of 'layout' above and draw the words
        // Wordcloud features that are THE SAME from one word to the other can be here
        function draw(words) {
          svg
            .append("g")
            .attr(
              "transform",
              "translate(" +
                layout.size()[0] / 2 +
                "," +
                layout.size()[1] / 2 +
                ")"
            )
            .selectAll("text")
            .data(words)
            .enter()
            .append("text")
            .style("font-size", function (d) {
              return d.size;
            })
            .style("fill", function (d) {
              return negative.includes(d.text) ? "#e15759" : "#4e79a7";
            }) //"#4e79a7")
            .attr("text-anchor", "middle")
            .style("font-family", "Impact")
            .attr("transform", function (d) {
              return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function (d) {
              return d.text;
            });
        }
      }
      makeGraphic(
        props.data.filter(
          (line) => line.model === selectedModel && line.sourceType !== "init"
        )
      );
    },
    [selectedModel]
  );

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header className="border-bottom border-light">
        <h5 className="mb-0">Πηγές Πόντων</h5>
      </Card.Header>
      <Card.Body className="px-0 px-lg-5">
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

export default connect(mapStateToProps)(PointsSources);
