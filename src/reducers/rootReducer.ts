import { IDish } from "../interfaces";
import { ActionTypeKeys } from "../constants/action-types";
import { ActionTypes } from "../actions";

interface IInitialState {
  starters: IDish[];
  main: IDish[];
  dessert: IDish[];
  [key: string]: IDish[];
}

const initialState: IInitialState = {
  starters: [],
  main: [],
  dessert: []
};

export default function rootReducer(state = initialState, action: ActionTypes) {
  if (action.type === ActionTypeKeys.DISH_SELECTED) {
    return Object.assign({}, state, {
      [action.payload.id]: state[action.payload.id].concat(
        action.payload.selected
      )
    });
  }

  if (action.type === ActionTypeKeys.DISH_UNSELECTED) {
    return Object.assign({}, state, {});
  }

  return state;
}
