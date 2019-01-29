import { ActionTypeKeys } from "../constants/action-types";
import { IDish } from "../interfaces";
import { Dispatch } from "react";

export interface IPayload {
  id: string;
  dish: IDish;
}

export interface IPayloadForbidden {
  id: string;
  name: string;
}

export interface IPayloadDataLoaded {
  starter: IDish[];
  main: IDish[];
  dessert: IDish[];
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

export interface IDataLoaded {
  type: ActionTypeKeys.DATA_LOADED;
  payload: IPayloadDataLoaded;
}

export type ActionTypes =
  | IDishSelected
  | IShowInfo
  | IAddToMenu
  | IRemoveFromMenu
  | IAddToForbidden
  | IRemoveFromForbidden
  | IDataLoaded;

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

// Async Middleware
export function getData() {
  return function(dispatch: Dispatch<IDataLoaded>) {
    // TODO - How to handle ERRORS with FETCH? Which distinctive features does it have?
    // The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500.
    // Instead, it will resolve normally (with ok status set to false),
    // and it will only reject on network failure or if anything prevented the request from completing.
    fetch("http://localhost:3004/dishes")
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("HTTP error, status = " + res.status);
      })
      .then(json => dispatch(dataLoaded(json)))
      .catch(err =>
        console.log(
          "There has been a problem with your fetch operation: " + err.message
        )
      );
  };
}

function dataLoaded(payload: IPayloadDataLoaded): IDataLoaded {
  return { type: ActionTypeKeys.DATA_LOADED, payload };
}

// loadDishes(dishesList: IContainerState) {
//   this.setState(() => {
//     return {
//       starter: dishesList.starter,
//       main: dishesList.main,
//       dessert: dishesList.dessert
//     };
//   });
// }

// async getData() {
//   try {
//     const response = await axios.get("http://localhost:3004/dishes");
//     return this.loadDishes(response.data);
//   } catch (e) {
//     throw new Error(e);
//   }
// }
