//import GNTM5 from "./GNTM5.json";
//import Survivor from "./Survivor.json";
import store from "./store";

//var episodes = GNTM5;
var teams = [];
var activeEpisodes = [];
var winner;
var rules = {};
export var teamOwner = {};

var team = {};
export var contestantSiteNames = {};
export var contestantFullNames = {};
export var pointsTranslateDict = {};
export var contestantFirstEpisode = {};
export var achievements = {};

function spreadsheetParser(ssLink) {
  const API_KEY = "";
  const BASE_URL = "https://sheets.googleapis.com/v4/spreadsheets/" + ssLink;

  let url = BASE_URL + "?key=" + API_KEY;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      url = BASE_URL + "/values:batchGet?key=" + API_KEY;
      data.sheets.forEach(
        (sheet) => (url = url + "&ranges=" + sheet.properties.title)
      );
      fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          team = {};
          contestantSiteNames = {};
          contestantFullNames = {};
          pointsTranslateDict = {};
          contestantFirstEpisode = {};
          achievements = {};
          rules = {};

          //winner
          winner = data.valueRanges[1].values[0];
          //teams
          data.valueRanges[2].values.forEach((team) => {
            teamOwner[team[0]] = team[1]
          });
          teams = Object.keys(teamOwner);

          //contestants
          let result = [];
          
          data.valueRanges[1].values.forEach((contestant) => {
            team[contestant[0]] = contestant[1]
            contestantSiteNames[contestant[0]] = contestant[2]
            contestantFullNames[contestant[0]] = contestant[3];
            contestantFirstEpisode[contestant[0]] = contestant[4];
            achievements[contestant[0]] = [];

            result.push({
              contestant: contestant[0],
              team: contestant[1],
              episode: "episode00",
              points: 0,
              source: "init",
              sourceType: "init",
            });
          });

          //points
          data.valueRanges[3].values.forEach((rule) => {
            pointsTranslateDict[rule[0]] = rule[2];
            rules[rule[0]] = {
              "points": parseInt(rule[1]),
              "fullName": rule[2],
              "category": rule[3]
            };
          });

          //achievements
          data.valueRanges[4].values.forEach((achievement) => {
            let ach = {
              "name": achievement[1],
              "description": achievement[2],
              "order": achievement[3],
            }
            achievement.slice(4).forEach((contestant) => {
              achievements[contestant].push(ach);
            });
          });

          //episodes
          data.valueRanges.slice(5).forEach((episode) => {
            activeEpisodes.push(episode.range.split("!")[0]);
            episode.values.forEach((rule) => {
              rule.splice(1).forEach((contestant)=>{   
                result.push({
                  contestant: contestant,
                  team: team[contestant],
                  episode: episode.range.split("!")[0],
                  points:  rules[rule[0]]["points"],
                  source: rule[0],
                  sourceType: rules[rule[0]]["category"],
                });
                console.log(result);
              });
            });

          });

          store.dispatch({
            type: "SET_DATA",
            payload: result,
          });
          store.dispatch({
            type: "SET_CONTESTANT",
            payload: getContestants().sort()[0],
          });
          store.dispatch({
            type: "SET_TEAM",
            payload: teams.sort()[0],
          });

        })
        .catch(function (err) {
          console.log(err);
        });
    })
    .catch(function (err) {
      console.log(err);
    });
}

export function initializeDataAndStore(prefix) {
  
  if (prefix === "GNTM5") spreadsheetParser("1ilegIxsh4U92MWEmv8MPH0id9tIlMDuvMhoZOWmi9zQ");
  if (prefix === "Survivor") spreadsheetParser("1o-TGc8594S0QMZApEC6jk5EULaqR1Z_fAiP7MZr3vzw");

  // team = {};
  // contestantSiteNames = {};
  // contestantFullNames = {};
  // pointsTranslateDict = {};
  // contestantFirstEpisode = {};
  // achievements = {};

  //teams = Object.keys(episodes["teams"]);
  //teamOwner = episodes["teams"];

  // Object.keys(episodes["contestants"]).forEach((contestant) => {
  //   team[contestant] = episodes["contestants"][contestant]["team"];
  //   contestantSiteNames[contestant] =
  //     episodes["contestants"][contestant]["siteName"];
  //   contestantFullNames[contestant] =
  //     episodes["contestants"][contestant]["fullName"];
  //   contestantFirstEpisode[contestant] =
  //     episodes["contestants"][contestant]["firstEpisode"];
  //   achievements[contestant] = [];
  // });

  // Object.keys(episodes["points"]).forEach((rule) => {
  //   pointsTranslateDict[rule] = episodes["points"][rule]["fullName"];
  // });

  // Object.keys(episodes["achievements"]).forEach((achievement) => {
  //   episodes["achievements"][achievement]["holders"].forEach((contestant) => {
  //     achievements[contestant].push(episodes["achievements"][achievement]);
  //   });
  // });
  //const activeEpisodes = getEpisodes();

  //let result = [];

  // getContestants().forEach((contestant) => {
  //   result.push({
  //     contestant: contestant,
  //     team: team[contestant],
  //     episode: "episode00",
  //     points: 0,
  //     source: "init",
  //     sourceType: "init",
  //   });
  // });

  // activeEpisodes.forEach((episode) => {
  //   Object.keys(episodes["episodes"][episode]).forEach((category) => {
  //     Object.keys(episodes["episodes"][episode][category]).forEach((rule) => {
  //       episodes["episodes"][episode][category][rule].forEach((contestant) => {
  //         result.push({
  //           contestant: contestant,
  //           team: team[contestant],
  //           episode: episode,
  //           points: episodes["points"][rule]["points"],
  //           source: rule,
  //           sourceType: category,
  //         });
  //       });
  //     });
  //   });
  // });

  // store.dispatch({
  //   type: "SET_DATA",
  //   payload: result,
  // });
  // store.dispatch({
  //   type: "SET_CONTESTANT",
  //   payload: getContestants().sort()[0],
  // });
  // store.dispatch({
  //   type: "SET_TEAM",
  //   payload: teams.sort()[0],
  // });
}

export function getTeams() {
  return teams;
}

export function groupByProperty(objectArray, property) {
  if (objectArray) {
    return objectArray.reduce((acc, obj) => {
      const key = obj[property];
      const curGroup = acc[key] ?? [];

      return { ...acc, [key]: [...curGroup, obj] };
    }, {});
  }
  return {};
}

export function sumPoints(lst, team) {
  if (lst[team]) {
    return lst[team].reduce(
      (previousValue, currentValue) => previousValue + currentValue["points"],
      0
    );
  } else return 0;
}

export function getEpisodes() {
  return activeEpisodes;
}

export function translateEpisodes(episode) {
  const result = episode.split("e");
  return "Επεισόδιο " + result[2];
}

export function getContestants() {
  return Object.keys(team);
}

export function isInGame(data, contestant) {
  const episodes = getEpisodes();
  const episodesData = groupByProperty(data, "episode");
  let i = 0;
  var result = true;
  while (i < episodes.length) {
    if (i < 9) {
      if (!inGame(episodesData["episode0" + (i + 1)], contestant)) {
        result = false;
        break;
      }
    } else {
      if (!inGame(episodesData["episode" + (i + 1)], contestant)) {
        result = false;
        break;
      }
    }
    i++;
  }
  while (i < episodes.length) {
    if (i < 9) {
      if (cameBack(episodesData["episode0" + (i + 1)], contestant)) {
        result = true;
        break;
      }
    } else {
      if (cameBack(episodesData["episode" + (i + 1)], contestant)) {
        result = true;
        break;
      }
    }
    i++;
  }
  while (i < episodes.length) {
    if (i < 9) {
      if (!inGame(episodesData["episode0" + (i + 1)], contestant)) {
        result = false;
        break;
      }
    } else {
      if (!inGame(episodesData["episode" + (i + 1)], contestant)) {
        result = false;
        break;
      }
    }
    i++;
  }
  return result;
}

export function cameBack(data, contestant) {
  const sources = groupByProperty(data, "source");

  return Object.keys(
    groupByProperty(sources["comeback"], "contestant")
  ).includes(contestant);
}

export function inGame(data, contestant) {
  const sources = groupByProperty(data, "source");

  return !(
    Object.keys(groupByProperty(sources["quit"], "contestant")).includes(
      contestant
    ) ||
    Object.keys(
      groupByProperty(sources["lastPlaceTop5"], "contestant")
    ).includes(contestant) ||
    Object.keys(groupByProperty(sources["left"], "contestant")).includes(
      contestant
    ) ||
    Object.keys(groupByProperty(sources["lastPlace"], "contestant")).includes(
      contestant
    )
  );
}

export function getContestantTeam(contestant) {
  return team[contestant];
}

export function getContestantRank(data, sourceType, contestant) {
  const contestantsData = groupByProperty(data, "contestant");
  const contestants = getContestants();
  if (sourceType === "drama") {
    contestants.sort(function (x, y) {
      if (sumPoints(contestantsData, x) < sumPoints(contestantsData, y)) {
        return -1;
      }
      if (sumPoints(contestantsData, x) > sumPoints(contestantsData, y)) {
        return 1;
      }
      return 0;
    });
  } else {
    contestants.sort(function (x, y) {
      if (sumPoints(contestantsData, x) < sumPoints(contestantsData, y)) {
        return 1;
      }
      if (sumPoints(contestantsData, x) > sumPoints(contestantsData, y)) {
        return -1;
      }
      return 0;
    });
  }

  return contestants.indexOf(contestant) + 1;
}

export function getRules() {
  return rules;
}

export function getWinner() {
  return winner;
}
