import { connect } from "react-redux";
import { fetchReminder, fetchUserReminders, destroyReminder } from "../../actions/reminder_actions";
import RecipientReminders from "./recipient_reminders";

const mapStateToProps = (state) => {
    debugger
    return {
        reminders: Object.values(state.reminders.user),
        currentUser: state.session.user,
        fetchedReminder: state.reminders.fetched,
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserReminders: (id) => dispatch(fetchUserReminders(id)),
    destroyReminder: (id) => dispatch(destroyReminder(id)),
    fetchReminder: (id) => dispatch(fetchReminder(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipientReminders);