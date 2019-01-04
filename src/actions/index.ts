import { ActionTypeKeys } from "../constants/action-types";
import { IDish } from "../interfaces";

export interface IPayload {
  id: string;
  dish: IDish;
}

export interface IPayloadForbidden {
  id: string;
  name: string;
}

export interface IDishSelected {
  type: ActionTypeKeys.DISH_SELECTED;
  payload: IPayload;
}

export interface IShowInfo {
  type: ActionTypeKeys.SHOW_INFO;
  payload: IPayload;
}

export interface IAddToMenu {
  type: ActionTypeKeys.ADD_TO_MENU;
  payload: IPayload;
}

export interface IRemoveFromMenu {
  type: ActionTypeKeys.REMOVE_FROM_MENU;
  payload: IPayload;
}

export interface IAddToForbidden {
  type: ActionTypeKeys.ADD_TO_FORBIDDEN;
  payload: IPayloadForbidden;
}

export interface IRemoveFromForbidden {
  type: ActionTypeKeys.REMOVE_FROM_FORBIDDEN;
  payload: IPayloadForbidden;
}

export type ActionTypes =
  | IDishSelected
  | IShowInfo
  | IAddToMenu
  | IRemoveFromMenu
  | IAddToForbidden
  | IRemoveFromForbidden;

export function dishSelected(payload: IPayload): IDishSelected {
  return {
    type: ActionTypeKeys.DISH_SELECTED,
    payload
  };
}

export function showInfo(payload: IPayload): IShowInfo {
  return {
    type: ActionTypeKeys.SHOW_INFO,
    payload
  };
}

export function addToMenu(payload: IPayload): IAddToMenu {
  return {
    type: ActionTypeKeys.ADD_TO_MENU,
    payload
  };
}

export function removeFromMenu(payload: IPayload): IRemoveFromMenu {
  return { type: ActionTypeKeys.REMOVE_FROM_MENU, payload };
}

export function addToForbidden(payload: IPayloadForbidden): IAddToForbidden {
  return { type: ActionTypeKeys.ADD_TO_FORBIDDEN, payload };
}

export function removeFromForbidden(
  payload: IPayloadForbidden
): IRemoveFromForbidden {
  return { type: ActionTypeKeys.REMOVE_FROM_FORBIDDEN, payload };
}
