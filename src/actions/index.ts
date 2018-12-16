import { DISH_SELECTED } from "../constants/action-types";

export function dishSelected(payload) {
  return {
    type: DISH_SELECTED,
    payload
  };
}
