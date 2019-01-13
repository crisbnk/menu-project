import { IDish } from "../interfaces";
import { ActionTypeKeys } from "../constants/action-types";
import { ActionTypes } from "../actions";

interface IInitialState {
  starter: IDish[];
  main: IDish[];
  dessert: IDish[];
  selected: IDish[];
  dishInfo: IDish[];
  forbiddenCombo: string[];
  [key: string]: IDish[] | string[];
}

const initialState: IInitialState = {
  starter: [],
  main: [],
  dessert: [],
  selected: [],
  dishInfo: [],
  forbiddenCombo: []
};

export default function rootReducer(state = initialState, action: ActionTypes) {
  if (action.type === ActionTypeKeys.SHOW_INFO) {
    return Object.assign({}, state, {
      dishInfo: action.payload.dish
    });
  }

  if (action.type === ActionTypeKeys.ADD_TO_MENU) {
    return Object.assign({}, state, {
      selected: state.selected.concat(action.payload.dish)
    });
  }

  if (action.type === ActionTypeKeys.REMOVE_FROM_MENU) {
    return Object.assign({}, state, {
      selected: state.selected.filter(
        (el: IDish) => el.name !== action.payload.dish.name
      )
    });
  }

  if (action.type === ActionTypeKeys.ADD_TO_FORBIDDEN) {
    return Object.assign({}, state, {
      forbiddenCombo: state.forbiddenCombo.concat(action.payload.name)
    });
  }

  if (action.type === ActionTypeKeys.REMOVE_FROM_FORBIDDEN) {
    return Object.assign({}, state, {
      forbiddenCombo: state.forbiddenCombo.filter(
        (el: string) => el !== action.payload.name
      )
    });
  }

  return state;
}
