import { getUserReminders, writeReminder, deleteReminder, getReminder } from "../util/reminder_util";

export const RECEIVE_USER_REMINDERS = "RECEIVE_USER_REMINDERS";
export const RECEIVE_NEW_REMINDER = "RECEIVE_NEW_REMINDER";
export const DELETE_REMINDER = "DELETE_REMINDER";
export const RECEIVE_REMINDER = "RECEIVE_REMINDER";
export const RECEIVE_REMINDER_ERRORS = "RECEIVE_REMINDER_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

export const receiveReminder = (reminder) => ({
    type: RECEIVE_REMINDER,
    reminder
})

export const receiveUserReminders = (reminders) => ({
  type: RECEIVE_USER_REMINDERS,
  reminders,
});

export const receiveNewReminder = (reminder) => ({
  type: RECEIVE_NEW_REMINDER,
  reminder,
});

export const removeReminder = id => {
  debugger
  return{
    type: DELETE_REMINDER,
    id
  }
}

const receiveErrors = (errors) => {
  debugger
  return {
    type: RECEIVE_REMINDER_ERRORS,
    errors: errors,
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};


export const fetchUserReminders = (id) => (dispatch) =>
  getUserReminders(id)
    .then((reminders) => dispatch(receiveUserReminders(reminders)))
    .catch((err) => dispatch(receiveErrors(err.response.data)));

export const composeReminder = (data) => (dispatch) => {
    return writeReminder(data)
      .then((reminder) => dispatch(receiveNewReminder(reminder)))
      .catch((err) => dispatch(receiveErrors(err.response.data)));
    
}

export const destroyReminder = id => dispatch => {
    debugger
    return deleteReminder(id)
      .then((id) => {
        debugger;
        dispatch(removeReminder(id));
      })
      .catch((err) => dispatch(receiveErrors(err.response.data)));   
}

export const fetchReminder = id => dispatch =>{
    return getReminder(id)
      .then((reminder) => dispatch(receiveReminder(reminder)))
      .catch((err) => dispatch(receiveErrors(err.response.data)));
}