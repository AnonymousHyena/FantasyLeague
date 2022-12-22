import { createStore } from "redux";

let initialState = {
  data: [],
  team: "",
  contestant: "",
};

function updateState(state = initialState, action) {
  if (action.type === "SET_DATA") {
    return { ...state, data: action.payload };
  } else if (action.type === "SET_CONTESTANT") {
    return { ...state, contestant: action.payload };
  } else if (action.type === "SET_TEAM") {
    return { ...state, team: action.payload };
  } else {
    return state;
  }
}

const store = createStore(updateState);

export default store;
