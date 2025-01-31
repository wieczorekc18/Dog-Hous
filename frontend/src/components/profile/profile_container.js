import { connect } from "react-redux";
import { fetchUserReminders } from "../../actions/reminder_actions";
import Profile from "./profile";
import { destroyReminder } from "../../actions/reminder_actions";

const mapStateToProps = (state) => {
    debugger
    return {
        reminders: Object.values(state.reminders.user),
        currentUser: state.session.user,
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserReminders: (id) => dispatch(fetchUserReminders(id)),
    destroyReminder: (id) => dispatch(destroyReminder(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
