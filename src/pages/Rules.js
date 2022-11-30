import React from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";

import Accoridon from "../components/Accoridon";

import * as utils from "../utils";

const Rules = (props) => {
  const rules = utils.getRules();

  function makeRulesTable(RuleType) {
    const result = [];
    Object.keys(rules).forEach((rule) => {
      if (rules[rule]["category"] === RuleType) {
        result.push(
          <tr>
            <th className="blue-bg">{rules[rule]["fullName"]}</th>
            <td>{rules[rule]["points"]}</td>
          </tr>
        );
      }
    });
    return result;
  }

  return (
    <>
      <Row className="justify-content-center">
        <Col xs={12} lg={6} className="mt-2 mb-4 d-block">
          <Accoridon
            defaultKey=""
            data={[
              {
                id: 1,
                eventKey: "panel-1",
                title: "Placement Points",
                description: (
                  <>
                    <table className="mx-auto border w-100">
                      <tbody>{makeRulesTable("placement")}</tbody>
                      {/* <tbody>
                        <tr>
                          <th className="blue-bg">Last Place</th>
                          <td>-3</td>
                        </tr>
                        <tr>
                          <th className="blue-bg">Last place w/ advantage </th>
                          <td>-5</td>
                        </tr>
                        <tr>
                          <th className="blue-bg">Bottom 25%</th>
                          <td>-1</td>
                        </tr>
                        <tr>
                          <th className="blue-bg">Bottom 25% w/ advantage</th>
                          <td>-2</td>
                        </tr>
                        <tr>
                          <th className="blue-bg">Bottom 50%</th>
                          <td>0</td>
                        </tr>
                        <tr>
                          <th className="blue-bg">Bot 50% w/ advantage</th>
                          <td>-1</td>
                        </tr>
                        <tr>
                          <th className="blue-bg">Top 50%</th>
                          <td>1</td>
                        </tr>
                        <tr>
                          <th className="blue-bg">Top 50% w/ disadvantage</th>
                          <td>2</td>
                        </tr>
                        <tr>
                          <th className="blue-bg">Top 25%</th>
                          <td>2</td>
                        </tr>
                        <tr>
                          <th className="blue-bg">3rd Place</th>
                          <td>4</td>
                        </tr>
                        <tr>
                          <th className="blue-bg">2nd Place</th>
                          <td>5</td>
                        </tr>
                        <tr>
                          <th className="blue-bg">1st Place</th>
                          <td>6</td>
                        </tr>
                        <tr>
                          <th className="blue-bg">1st Place w/ disadvantage</th>
                          <td>9</td>
                        </tr>
                        <tr>
                          <th className="blue-bg">Quit</th>
                          <td>-5</td>
                        </tr>
                      </tbody> */}
                    </table>
                  </>
                ),
              },
              {
                id: 2,
                eventKey: "panel-2",
                title: "Drama Points",
                description: (
                  <>
                    <table className="mx-auto border w-100">
                      <tbody>{makeRulesTable("drama")}</tbody>
                      {/* <tbody>
                        <tr className="w-lg-50">
                          <th className="blue-bg">Makeover drama</th>
                          <td>-5</td>
                        </tr>
                        <tr>
                          <th className="blue-bg">Start argument</th>
                          <td>-2</td>
                        </tr>
                        <tr>
                          <th className="blue-bg">Participate in Argument</th>
                          <td>-1</td>
                        </tr>
                        <tr>
                          <th className="blue-bg">
                            "Injury / Interupt the flow of the curent activity"
                          </th>
                          <td>-1</td>
                        </tr>
                        <tr>
                          <th className="blue-bg">"Αδικήθηκα"</th>
                          <td>-1</td>
                        </tr>
                        <tr>
                          <th className="blue-bg">Talk back to judge</th>
                          <td>-2</td>
                        </tr>
                        <tr>
                          <th className="blue-bg">
                            Complain about clothes / make-up
                          </th>
                          <td>-2</td>
                        </tr>
                        <tr>
                          <th className="blue-bg">Badmouthing</th>
                          <td>-1</td>
                        </tr>
                      </tbody> */}
                    </table>
                  </>
                ),
              },
              {
                id: 3,
                eventKey: "panel-3",
                title: "Miscellaneous Points",
                description: (
                  <>
                    <table className="mx-auto border w-100">
                      <tbody>{makeRulesTable("misc")}</tbody>
                      {/* <tbody>
                        <tr>
                          <th className="blue-bg">Win Challenge</th>
                          <td>2</td>
                        </tr>
                        <tr>
                          <th className="blue-bg">
                            Positive comment from crew
                          </th>
                          <td>1</td>
                        </tr>
                        <tr>
                          <th className="blue-bg">Eating</th>
                          <td>1</td>
                        </tr>
                        <tr>
                          <th className="blue-bg">Do house chores</th>
                          <td>1</td>
                        </tr>
                        <tr>
                          <th className="blue-bg">Athletic activities</th>
                          <td>1</td>
                        </tr>
                        <tr>
                          <th className="blue-bg">Comeback</th>
                          <td>5</td>
                        </tr>
                      </tbody> */}
                    </table>
                  </>
                ),
              },
            ]}
          />
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = function (state) {
  return {};
};

export default connect(mapStateToProps)(Rules);
