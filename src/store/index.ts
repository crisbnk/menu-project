import { createStore, applyMiddleware, Middleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../reducers/rootReducer";
import forbiddenComboMiddleware from "../middleware/forbiddenComboMiddleware";
import { getDataMiddleware } from "../middleware/getDataMiddleware";

const middlewares: Middleware[] = [getDataMiddleware, forbiddenComboMiddleware];
const composeEnhancers = composeWithDevTools({});
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
