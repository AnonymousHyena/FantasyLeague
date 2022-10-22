import plateaus from "./Plateaus.json";
import store from "./store";

const points = {
  firstPlaceDis: 9,
  firstPlace: 6,
  secondPlace: 5,
  thirdPlace: 4,
  thirdPlaceDis: 5,
  top25: 2,
  top25Dis: 3,
  top50: 1,
  top50Dis: 2,
  lastPlace: -1,
  bot50Adv: -1,
  quit: -5,
  injury: -1,
  badmouthing: -1,
  interuption: -1,
  gymnastics: 1,
  food: 1,
};

const teams = [
  "Το Κορμί σου το Φρυδίσιο",
  "Ουμφοσυγκλομανιφίκ",
  "Φρυδερίκη αγάπη μου",
  "Ομάδα",
];
const owner = ["Statics", "Geo", "Tsamis", "Snouf"];

const team = {
  "Αλεξία Κ.": "Το Κορμί σου το Φρυδίσιο",
  "Αλεξία Τ.": "Φρυδερίκη αγάπη μου",
  Άννα: "Ουμφοσυγκλομανιφίκ",
  Βικτώρια: "Φρυδερίκη αγάπη μου",
  Γιέβα: "Ομάδα",
  Γρηγοριάννα: "Ομάδα",
  Δέσποινα: "Ομάδα",
  Εβελίνα: "Ομάδα",
  Έλενα: "Φρυδερίκη αγάπη μου",
  Έφη: "Το Κορμί σου το Φρυδίσιο",
  Ζωή: "Ουμφοσυγκλομανιφίκ",
  Κατερίνα: "Ουμφοσυγκλομανιφίκ",
  Κάτια: "Το Κορμί σου το Φρυδίσιο",
  Κότυ: "Το Κορμί σου το Φρυδίσιο",
  Μάρα: "Ουμφοσυγκλομανιφίκ",
  Μαρία: "Ουμφοσυγκλομανιφίκ",
  Μαρίττα: "Ουμφοσυγκλομανιφίκ",
  Μικαέλα: "Φρυδερίκη αγάπη μου",
  Μύρια: "Ομάδα",
  Νάγια: "",
  Νικόλ: "Το Κορμί σου το Φρυδίσιο",
  Τζούλια: "Φρυδερίκη αγάπη μου",
};

export function initializeDataAndStore() {
  const activePlateaus = Object.keys(plateaus);
  activePlateaus.shift();

  let result = [];

  activePlateaus.forEach((plateau) => {
    Object.keys(plateaus[plateau]).forEach((category) => {
      Object.keys(plateaus[plateau][category]).forEach((rule) => {
        plateaus[plateau][category][rule].forEach((model) => {
          result.push({
            model: model,
            team: team[model],
            plateau: plateau,
            points: points[rule],
          });
        });
      });
    });
  });

  store.dispatch({
    type: "SET_DATA",
    payload: result,
  });
}

export function teamOwner(team) {
  if (team === teams[0]) {
    return owner[0];
  } else if (team === teams[1]) {
    return owner[1];
  } else if (team === teams[2]) {
    return owner[2];
  } else if (team === teams[3]) {
    return owner[3];
  }
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
  }
}
