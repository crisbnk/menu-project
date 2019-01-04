// See https://github.com/reduxjs/redux/blob/master/test/typescript/middleware.ts

import { ActionTypeKeys } from "../constants/action-types";
import { addToForbidden, removeFromForbidden, ActionTypes } from "../actions";
import forbiddenCombinations from "../helpers/forbiddenCombinations";
import { MiddlewareAPI, Dispatch } from "redux";

export default function forbiddenComboMiddleware(store: MiddlewareAPI) {
  return function(next: Dispatch) {
    return function(action: ActionTypes) {
      const actualState = store.getState();
      const forbiddenCombo = actualState.forbiddenCombo;

      if (action.type === ActionTypeKeys.ADD_TO_MENU) {
        const dishForbidden = forbiddenCombinations[action.payload.dish.name];
        if (dishForbidden && !forbiddenCombo.includes(dishForbidden))
          store.dispatch(
            addToForbidden({
              id: "forbiddenCombo",
              name: dishForbidden
            })
          );
      }

      if (action.type === ActionTypeKeys.REMOVE_FROM_MENU) {
        const dishForbidden = forbiddenCombinations[action.payload.dish.name];
        if (dishForbidden && forbiddenCombo.includes(dishForbidden))
          store.dispatch(
            removeFromForbidden({ id: "forbiddenCombo", name: dishForbidden })
          );
      }

      return next(action);
    };
  };
}
