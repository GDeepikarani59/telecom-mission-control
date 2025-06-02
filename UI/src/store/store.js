import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import authReducer from "../reducers/authReducer";
import policyReducer from "../reducers/policyReducer";
import towerReducer from "../reducers/towerReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  policy: policyReducer,
  towers: towerReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
