import { createSelector } from "reselect";
import { IInitialState, IDish } from "../interfaces";

function initialSelectedSelector(state: IInitialState): IDish[] {
  return state.selected;
}

export const selectedSelector = createSelector(
  initialSelectedSelector,
  selected => selected.reduce((pv, cv) => pv + cv.price, 0)
);
