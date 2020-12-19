import {
  RECEIVE_REMINDER_ERRORS,
} from "../actions/reminder_actions";

const _nullErrors = [];

const ReminderErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_REMINDER_ERRORS:
        debugger
      return action.errors;
    default:
      return state;
  }
};

export default ReminderErrorsReducer;
