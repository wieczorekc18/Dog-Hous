import { connect } from "react-redux";
import { fetchUserReminders } from "../../actions/reminder_actions";
import Profile from "./profile";

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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
