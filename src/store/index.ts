import { createStore, applyMiddleware, Middleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../reducers/rootReducer";
import thunkMiddleware from "redux-thunk";
import forbiddenComboMiddleware from "../middleware/forbiddenComboMiddleware";

const middlewares: Middleware[] = [thunkMiddleware, forbiddenComboMiddleware];
const composeEnhancers = composeWithDevTools({});
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
