import { createStore } from "redux";

let initialState = {
  data: [],
};

function updateState(state = initialState, action) {
  if (action.type === "SET_DATA") {
    return { ...state, data: action.payload };
  } else {
    return state;
  }
}

const store = createStore(updateState);

export default store;
