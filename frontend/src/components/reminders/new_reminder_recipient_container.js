import { connect } from "react-redux";
import { composeReminder } from "../../actions/reminder_actions";
import NewReminder from "./new_reminder_form";

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.user,
    newReminder: state.reminders.new,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    composeReminder: (data) => dispatch(composeReminder(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewReminder);
