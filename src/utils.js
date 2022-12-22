import GNTM5 from "./GNTM5.json";
import Survivor from "./Survivor.json";
import store from "./store";

var episodes = GNTM5;

var teams = [];
export var teamOwner = {};

const team = {};
export const contestantStarNames = {};
export const contestantFullNames = {};
export const pointsTranslateDict = {};
export const contestantFirstEpisode = {};
export const achievements = {};

export function initializeDataAndStore(prefix) {
  if (prefix === "GNTM5") episodes = GNTM5;
  if (prefix === "Survivor") episodes = Survivor;

  teams = Object.keys(episodes["teams"]);
  teamOwner = episodes["teams"];

  Object.keys(episodes["contestants"]).forEach((contestant) => {
    team[contestant] = episodes["contestants"][contestant]["team"];
    contestantStarNames[contestant] =
      episodes["contestants"][contestant]["starName"];
    contestantFullNames[contestant] =
      episodes["contestants"][contestant]["fullName"];
    contestantFirstEpisode[contestant] =
      episodes["contestants"][contestant]["firstEpisode"];
    achievements[contestant] = [];
  });

  Object.keys(episodes["points"]).forEach((rule) => {
    pointsTranslateDict[rule] = episodes["points"][rule]["fullName"];
  });

  Object.keys(episodes["achievements"]).forEach((achievement) => {
    episodes["achievements"][achievement]["holders"].forEach((contestant) => {
      achievements[contestant].push(episodes["achievements"][achievement]);
    });
  });
  const activeEpisodes = getEpisodes();

  let result = [];

  getContestants().forEach((contestant) => {
    result.push({
      contestant: contestant,
      team: team[contestant],
      episode: "episode00",
      points: 0,
      source: "init",
      sourceType: "init",
    });
  });

  activeEpisodes.forEach((episode) => {
    Object.keys(episodes["episodes"][episode]).forEach((category) => {
      Object.keys(episodes["episodes"][episode][category]).forEach((rule) => {
        episodes["episodes"][episode][category][rule].forEach((contestant) => {
          result.push({
            contestant: contestant,
            team: team[contestant],
            episode: episode,
            points: episodes["points"][rule]["points"],
            source: rule,
            sourceType: category,
          });
        });
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
  const activeEpisodes = Object.keys(episodes["episodes"]);
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
  return episodes["points"];
}
