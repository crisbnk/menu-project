import { takeEvery, call, put } from "redux-saga/effects";
import { ActionTypeKeys } from "../constants/action-types";

export default function* watcher() {
  yield takeEvery(ActionTypeKeys.DATA_REQUESTED, worker);
}

function* worker() {
  try {
    const payload = yield call(getData);
    yield put({ type: ActionTypeKeys.DATA_LOADED, payload });
  } catch (error) {
    const payload = { message: error.message };
    yield put({ type: ActionTypeKeys.API_ERRORED, payload });
  }
}

function getData() {
  return fetch("http://localhost:3004/dishes")
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error("HTTP error, status = " + res.status);
    })
    .then(json => json)
    .catch(err => err);
}
