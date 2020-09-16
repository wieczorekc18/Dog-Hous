import { combineReducers } from "redux";
import session from "./session_reducer";
import errors from "./errors_reducer";
import reminders from "./reminder_reducer"

const RootReducer = combineReducers({
    session,
    errors,
    reminders
});

export default RootReducer;
