import { IDish } from "../interfaces";
import { DISH_SELECTED } from "../constants/action-types";

interface IInitialState {
  starters: IDish[];
  main: IDish[];
  dessert: IDish[];
}

const initialState: IInitialState = {
  starters: [],
  main: [],
  dessert: []
};

export default function rootReducer(state = initialState, action) {
  if (action.type === DISH_SELECTED) {
    return Object.assign({}, state, {
      [action.payload.id]: state[action.payload.id].concat(
        action.payload.selected
      )
    });
  }
  return state;
}
