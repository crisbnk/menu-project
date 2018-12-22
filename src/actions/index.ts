import { ActionTypeKeys } from "../constants/action-types";
import { IDish } from "../interfaces";
import { type } from "os";

interface IPayload {
  id: string;
  selected: IDish;
}

export interface IDishSelected {
  type: ActionTypeKeys.DISH_SELECTED;
  payload: IPayload;
}

export interface IDishUnselected {
  type: ActionTypeKeys.DISH_UNSELECTED;
}

export type ActionTypes = IDishSelected | IDishUnselected;

export function dishSelected(payload: IPayload): IDishSelected {
  return {
    type: ActionTypeKeys.DISH_SELECTED,
    payload
  };
}

export function dishUnselected(payload: IPayload): IDishUnselected {
  return {
    type: ActionTypeKeys.DISH_UNSELECTED
  };
}
