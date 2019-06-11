import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import Settings from "./Settings";
import Auth from "./Auth";
import User from "./User"
import Register from "./Register";

const reducers = combineReducers({
  routing: routerReducer,
  settings: Settings,
  auth: Auth,
  user: User,
  register: Register
});

export default reducers;
