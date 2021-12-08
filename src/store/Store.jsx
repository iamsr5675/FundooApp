import { createStore, combineReducers } from "redux";
import { drawerReducer } from "./reducers/Reducer";

const reducer = combineReducers({
  drawerReducer,
});

const store = createStore(reducer);

export default store;
