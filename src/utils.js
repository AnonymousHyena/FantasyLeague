import episodes from "./GNTM5.json";
import store from "./store";

const teams = Object.keys(episodes["teams"]);
export const teamOwner = episodes["teams"];

const team = {};
export const modelStarNames = {};
export const modelFullNames = {};
export const pointsTranslateDict = {};
export const modelFirstEpisode = {};
export const achievements = {};

Object.keys(episodes["models"]).forEach((model) => {
  team[model] = episodes["models"][model]["team"];
  modelStarNames[model] = episodes["models"][model]["starName"];
  modelFullNames[model] = episodes["models"][model]["fullName"];
  modelFirstEpisode[model] = episodes["models"][model]["firstEpisode"];
  achievements[model] = [];
});

Object.keys(episodes["points"]).forEach((rule) => {
  pointsTranslateDict[rule] = episodes["points"][rule]["fullName"];
});

Object.keys(episodes["achievements"]).forEach((achievement) => {
  episodes["achievements"][achievement]["holders"].forEach((model) => {
    achievements[model].push(episodes["achievements"][achievement]);
  });
});

export function initializeDataAndStore() {
  const activeEpisodes = getEpisodes();

  let result = [];

  getModels().forEach((model) => {
    result.push({
      model: model,
      team: team[model],
      episode: "episode00",
      points: 0,
      source: "init",
      sourceType: "init",
    });
  });

  activeEpisodes.forEach((episode) => {
    Object.keys(episodes["episodes"][episode]).forEach((category) => {
      Object.keys(episodes["episodes"][episode][category]).forEach((rule) => {
        episodes["episodes"][episode][category][rule].forEach((model) => {
          result.push({
            model: model,
            team: team[model],
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
    type: "SET_MODEL",
    payload: getModels().sort()[0],
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

export function getModels() {
  return Object.keys(team);
}

export function isInGame(data, model) {
  const episodes = getEpisodes();
  const episodesData = groupByProperty(data, "episode");
  let i = 0;
  var result = true;
  while (i < episodes.length) {
    if (i < 9) {
      if (!inGame(episodesData["episode0" + (i + 1)], model)) {
        result = false;
        break;
      }
    } else {
      if (!inGame(episodesData["episode" + (i + 1)], model)) {
        result = false;
        break;
      }
    }
    i++;
  }
  while (i < episodes.length) {
    if (i < 9) {
      if (cameBack(episodesData["episode0" + (i + 1)], model)) {
        result = true;
        break;
      }
    } else {
      if (cameBack(episodesData["episode" + (i + 1)], model)) {
        result = true;
        break;
      }
    }
    i++;
  }
  while (i < episodes.length) {
    if (i < 9) {
      if (!inGame(episodesData["episode0" + (i + 1)], model)) {
        result = false;
        break;
      }
    } else {
      if (!inGame(episodesData["episode" + (i + 1)], model)) {
        result = false;
        break;
      }
    }
    i++;
  }
  return result;
}

export function cameBack(data, model) {
  const sources = groupByProperty(data, "source");

  return Object.keys(groupByProperty(sources["comeback"], "model")).includes(
    model
  );
}

export function inGame(data, model) {
  const sources = groupByProperty(data, "source");

  return !(
    Object.keys(groupByProperty(sources["quit"], "model")).includes(model) ||
    Object.keys(groupByProperty(sources["lastPlaceTop5"], "model")).includes(
      model
    ) ||
    Object.keys(groupByProperty(sources["lastPlace"], "model")).includes(model)
  );
}

export function getModelTeam(model) {
  return team[model];
}

export function getModelRank(data, sourceType, model) {
  const modelsData = groupByProperty(data, "model");
  const models = getModels();
  if (sourceType === "drama") {
    models.sort(function (x, y) {
      if (sumPoints(modelsData, x) < sumPoints(modelsData, y)) {
        return -1;
      }
      if (sumPoints(modelsData, x) > sumPoints(modelsData, y)) {
        return 1;
      }
      return 0;
    });
  } else {
    models.sort(function (x, y) {
      if (sumPoints(modelsData, x) < sumPoints(modelsData, y)) {
        return 1;
      }
      if (sumPoints(modelsData, x) > sumPoints(modelsData, y)) {
        return -1;
      }
      return 0;
    });
  }

  return models.indexOf(model) + 1;
}

export function getRules() {
  return episodes["points"];
}
