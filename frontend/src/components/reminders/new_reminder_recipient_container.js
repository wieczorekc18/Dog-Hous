import { connect } from "react-redux";
import { composeReminder } from "../../actions/reminder_actions";
import { fetchReminder } from "../../actions/reminder_actions";
import NewReminderRecipient from "./new_reminder_recipient_form";

const mapStateToProps = (state) => {
    debugger
    //add
  return {
    errors: state.errors.reminders,
    currentUser: state.session.user,
    fetchedReminder: state.reminders.fetched,
  };
};

const mapDispatchToProps = (dispatch) => {
    debugger
    //add
  return {
    composeReminder: (data) => dispatch(composeReminder(data)),
    fetchReminder: (id) => dispatch(fetchReminder(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewReminderRecipient);
