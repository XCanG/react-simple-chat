import { combineReducers } from "redux";
import name from "./name";
import messages from "./messages";

export default combineReducers({
	name,
	messages
});
