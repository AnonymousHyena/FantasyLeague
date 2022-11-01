import plateaus from "./Plateaus.json";
import store from "./store";

const points = {
  firstPlaceDis: 9,
  firstPlace: 6,
  firstPlaceNo25: 4,
  secondPlace: 5,
  thirdPlace: 4,
  thirdPlaceNo25: 3,
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
  chores: 1,
  challenge: 2,
  makeover: -5,
};

export const pointsTranslateDict = {
  firstPlaceDis: "Πρώτη θέση με disadvantage",
  firstPlace: "Πρώτη θέση",
  firstPlaceNo25: "Πρώτη θέση χωρίς πλατό",
  secondPlace: "Δεύτερη θέση",
  thirdPlace: "Τρίτη θέση",
  thirdPlaceDis: "Τρίτη θέση με disadvantage",
  thirdPlaceNo25: "Τρίτη θέση",
  top25: "Top 25%",
  top25Dis: "Top 25% με disadvantage",
  top50: "Top 50%",
  top50Dis: "Top 50% με disadvantage",
  lastPlace: "Τελευταία θέση",
  bot50Adv: "Bottom 50% με advatnage",
  quit: "Οικειοθελής αποχώρηση",
  injury: "Τραυματισμός",
  badmouthing: "Κράξιμο",
  interuption: "Διακοπή ροής της διαδικασίας",
  gymnastics: "Γυμναστική",
  food: "Φαγητό",
  chores: "Δουλιές σπιτιού",
  challenge: "Δοκιμασία",
  makeover: "Makeover drama",
};

const teams = [
  "Το Κορμί σου το Φρυδίσιο",
  "Ουμφοσυγκλομανιφίκ",
  "Φρυδερίκη αγάπη μου",
  "Ομάδα",
];

export const teamOwner = {
  "Το Κορμί σου το Φρυδίσιο": "Statics",
  Ουμφοσυγκλομανιφίκ: "Geo",
  "Φρυδερίκη αγάπη μου": "Tsamis",
  Ομάδα: "Snouf",
};

const team = {
  "Αλεξία Κ.": "Το Κορμί σου το Φρυδίσιο",
  "Αλεξία Τ.": "Φρυδερίκη αγάπη μου",
  Άννα: "Ουμφοσυγκλομανιφίκ",
  Βικτώρια: "Φρυδερίκη αγάπη μου",
  Γιέβα: "Ομάδα",
  Γρηγοριάνα: "Ομάδα",
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
  Μαρίτα: "Ουμφοσυγκλομανιφίκ",
  Μικαέλα: "Φρυδερίκη αγάπη μου",
  Μύρια: "Ομάδα",
  Νάγια: "",
  Νικόλ: "Το Κορμί σου το Φρυδίσιο",
  Τζούλια: "Φρυδερίκη αγάπη μου",
  Ντορέλα: "Ομάδα",
  Ραφαέλα: "Το Κορμί σου το Φρυδίσιο",
  Ειρήνη: "Ουμφοσυγκλομανιφίκ",
  Γεωργιάννα: "Φρυδερίκη αγάπη μου",
};

export const modelStarNames = {
  Νάγια: "nagia_kontostergiou-1920x1004-b_w",
  Μαρία: "maria_kosta-1920x1004",
  Κατερίνα: "katerina_kara-1920x1004-b_w",
  Ζωή: "zoi_ioannidou-1920x1004",
  Έλενα: "elena_lisandrou-1920x1004-b_w",
  Έφη: "efi_mpanti-1920x1004-b_w",
  "Αλεξία Κ.": "aleksia_kouvela-1920x1004-b_w",
  Μύρια: "miria_kiriakidou-1920x1004",
  Μικαέλα: "mixaela_novak_marli-1920x1004",
  Βικτώρια: "victoria_miroforidou-1920x1004",
  Μάρα: "mara_marli-1920x1004",
  Νικόλ: "nikol_tsoulos-1920x1004-b_w",
  Δέσποινα: "despoina_sarri-1920x1004",
  Γρηγοριάνα: "grigoriana_plita-1920x1004",
  Μαρίτα: "marita_kathitzioti-1920x1004",
  "Αλεξία Τ.": "aleksia_traiko-1920x1004",
  Εβελίνα: "evelina_petrougaki-1920x1004-b_w",
  Τζούλια: "tzoulia_iligenko-1920x1004-b_w",
  Κάτια: "katia_kizima-1920x1004",
  Κότυ: "koti_gougousi_camacho-1920x1004",
  Γιέβα: "gieva_mpontarenko-1920x1004",
  Ντορέλα:
    "%CE%BD%CF%84%CE%BF%CF%81%CE%B5%CE%BB%CE%B1_%CE%B3%CE%BA%CE%B5%CE%BA%CE%B1-1930x1004",
  Ραφαέλα:
    "%CF%81%CE%B1%CF%86%CE%B1%CE%B5%CE%BB%CE%B1_%CF%87%CE%B1%CF%81%CE%B1%CE%BB%CE%B1%CE%BC%CF%80%CE%BF%CF%85%CF%82-1920x1004",
  Ειρήνη:
    "%CE%B5%CE%B9%CF%81%CE%B7%CE%BD%CE%B7_%CE%B1%CE%BD%CF%84%CF%89%CE%BD%CE%B9%CE%BF%CF%85-1920x1004",
  Γεωργιάννα:
    "%CE%B3%CE%B5%CF%89%CF%81%CE%B3%CE%B9%CE%B1%CE%BD%CE%B1_%CE%B9%CF%89%CE%B1%CE%BA%CE%B5%CE%B9%CE%BC%CE%B9%CE%B4%CE%B7-1920x1004",
};

export const modelFullNames = {
  Άννα: "Άννα",
  Νάγια: "Νάγια Κοντοστεργίου",
  Μαρία: "Μαρία Κώστα",
  Κατερίνα: "Κατερίνα Καρά",
  Ζωή: "Ζωή Ιωαννίδου",
  Έλενα: "Έλενα Λυσάνδρου",
  Έφη: "Έφη Μπαντή",
  "Αλεξία Κ.": "Αλεξία Κουβελά",
  Μύρια: "Μύρια Κυριακίδου",
  Μικαέλα: "Μικαέλα Novak Μαρλή",
  Βικτώρια: "Βικτώρια Μυροφορίδου",
  Μάρα: "Μάρα Μαρλή",
  Νικόλ: "Νικόλ Τσούλος",
  Δέσποινα: "Δέσποινα Σαρρή",
  Γρηγοριάνα: "Γρηγοριάνα Πλύτα",
  Μαρίτα: " Μαρίτα Καθιτζιώτη",
  "Αλεξία Τ.": "Αλεξία Τράικο",
  Εβελίνα: "Εβελίνα Πετρουγάκη",
  Τζούλια: " Τζούλια Iligenko",
  Κάτια: "Κάτια Kizima",
  Κότυ: "Κότυ Γουγούση Camacho",
  Γιέβα: "Γιέβα Mpontarenko",
  Ντορέλα: "Ντορέλα Γκέκα",
  Ραφαέλα: "Ραφαέλα Χαραλάμπους",
  Ειρήνη: "Ειρήνη Αντωνίου",
  Γεωργιάννα: "Γεωργιάννα Ιωακειμίδη",
};

export function initializeDataAndStore() {
  const activePlateaus = Object.keys(plateaus);
  activePlateaus.shift();

  let result = [];

  getModels().forEach((model) => {
    result.push({
      model: model,
      team: team[model],
      plateau: "",
      points: 0,
      source: "init",
      sourceType: "init",
    });
  });

  activePlateaus.forEach((plateau) => {
    Object.keys(plateaus[plateau]).forEach((category) => {
      Object.keys(plateaus[plateau][category]).forEach((rule) => {
        plateaus[plateau][category][rule].forEach((model) => {
          result.push({
            model: model,
            team: team[model],
            plateau: plateau,
            points: points[rule],
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

export function getPlateaus() {
  const activePlateaus = Object.keys(plateaus);
  activePlateaus.shift();
  return activePlateaus;
}

export function translatePlateaus(plateau) {
  const result = plateau.split("u");
  return "Πλατό " + result[1];
}

export function getModels() {
  return Object.keys(team);
}

export function isInGame(data, model) {
  const sources = groupByProperty(data, "source");

  return !(
    Object.keys(groupByProperty(sources["quit"], "model")).includes(model) ||
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
