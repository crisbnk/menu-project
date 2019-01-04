import { ActionTypeKeys } from "../constants/action-types";
import { addToForbidden, removeFromForbidden } from "../actions";
import forbiddenCombinations from "../helpers/forbiddenCombinations";

export default function forbiddenComboMiddleware(store) {
  return function(next) {
    return function(action) {
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
