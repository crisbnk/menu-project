import { ActionTypeKeys } from "../constants/action-types";
import { dataLoaded, apiErrored, ActionTypes } from "../actions";
import { Dispatch, Middleware, MiddlewareAPI } from "redux";

export function getDataMiddleware({ dispatch }: MiddlewareAPI) {
  return function(next: Dispatch) {
    return function(action: ActionTypes) {
      if (action.type === ActionTypeKeys.DATA_REQUESTED) {
        fetch("http://localhost:3004/dishes")
          .then(res => {
            if (res.ok) {
              return res.json();
            }
            throw new Error("HTTP error, status = " + res.status);
          })
          .then(json => dispatch(dataLoaded(json)))
          .catch(err => {
            console.log(
              "There has been a problem with your fetch operation: " +
                err.message
            );
            dispatch(apiErrored({ message: err.message }));
          });
      }
      return next(action);
    };
  };
}