import { connect } from "react-redux";
import ShowReminder from "./show_reminder";
import { fetchReminder } from "../../actions/reminder_actions";
import { destroyReminder } from "../../actions/reminder_actions"

const mapStateToProps = (state) => {
    debugger
    return({
        reminder: state.reminders.fetched
    })
};

const mapDispatchToProps = (dispatch) => ({
  fetchReminder: (id) => dispatch(fetchReminder(id)),
  destroyReminder: (id) => dispatch(destroyReminder(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowReminder);
