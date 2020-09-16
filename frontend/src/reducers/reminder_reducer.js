import {
    RECEIVE_USER_REMINDERS,
    RECEIVE_NEW_REMINDER,
    DELETE_REMINDER,
    RECEIVE_REMINDER
} from "../actions/reminder_actions";
// import merge from 'lodash/merge'


// const RemindersReducer = (
//     state = { all: {}, user: {}, new: undefined },
//     action
//     ) => {
//     Object.freeze(state);
//     switch (action.type) {
//         case RECEIVE_USER_REMINDERS:
//             return merge({}, action.reminders.data)
//         case RECEIVE_REMINDER:
//             debugger
//             //reminder._id ??? needed
//             return merge({}, state, {[action.reminder.data._id]: action.reminder});
//         case DELETE_REMINDER:
//             let newState = merge({}, state);
//             delete newState[action.id];
//             return newState;
//         default:
//             return state;
//   }
// };

const RemindersReducer = (
    state = { all: {}, user: {}, new: undefined },
    action
    ) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_USER_REMINDERS:
            newState.user = action.reminders.data;
            return newState;
        case RECEIVE_NEW_REMINDER:
            newState.new = action.reminder.data;
            return newState;
        case RECEIVE_REMINDER:
            debugger
            newState.new = action.reminder.data;
            return newState
        case DELETE_REMINDER:
            debugger
            return newState
        default:
            return state;
  }
};

export default RemindersReducer;


// alt version

