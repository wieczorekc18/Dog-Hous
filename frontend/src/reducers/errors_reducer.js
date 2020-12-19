import { combineReducers } from "redux";

import SessionErrorsReducer from "./session_errors_reducer";
import ReminderErrorsReducer from "./reminder_errors_reducer";

export default combineReducers({
  session: SessionErrorsReducer,
  reminder: ReminderErrorsReducer,
});
