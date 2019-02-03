import { IDish } from "../interfaces";
import { ActionTypeKeys } from "../constants/action-types";
import { ActionTypes } from "../actions";
import { IInitialState } from "../interfaces";

const initialState: IInitialState = {
  starter: [],
  main: [],
  dessert: [],
  selected: [],
  message: "",
  dishInfo: { name: "", id: 0, price: 0, img: "" },
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

  if (action.type === ActionTypeKeys.DATA_LOADED) {
    return Object.assign({}, state, {
      starter: action.payload.starter,
      main: action.payload.main,
      dessert: action.payload.dessert
    });
  }

  if (action.type === ActionTypeKeys.API_ERRORED) {
    return Object.assign({}, state, { message: action.payload.message });
  }

  return state;
}
