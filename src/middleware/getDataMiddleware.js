import { ActionTypeKeys } from "../constants/action-types";
import { dataLoaded, apiErrored } from "../actions";

export function getDataMiddleware({ dispatch }) {
  return function(next) {
    return function(action) {
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
            dispatch(apiErrored(err));
          });
      }
      return next(action);
    };
  };
}

// return function(dispatch: Dispatch<IDataLoaded>) {
//   // TODO - How to handle ERRORS with FETCH? Which distinctive features does it have?
//   // The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500.
//   // Instead, it will resolve normally (with ok status set to false),
//   // and it will only reject on network failure or if anything prevented the request from completing.
//   fetch("http://localhost:3004/dishes")
//     .then(res => {
//       if (res.ok) {
//         return res.json();
//       }
//       throw new Error("HTTP error, status = " + res.status);
//     })
//     .then(json => dispatch(dataLoaded(json)))
//     .catch(err =>
//       console.log(
//         "There has been a problem with your fetch operation: " + err.message
//       )
//     );
// };
