import React from "react";
import Nav from "../nav/navbar";

class NewReminderRecipient extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipientName: "",
      relationship: "",
      occasion: "",
      date: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    debugger;
    this.setState({ 
        fetchedReminder: nextProps.fetchedReminder,
        recipientName: nextProps.fetchedReminder.recipientName,
        relationship: nextProps.fetchedReminder.relationship
    });
  }

  componentDidMount() {
    debugger;
    this.props.fetchReminder(this.props.match.params.reminderId);
    debugger
    //set state
  }

  handleSubmit(e) {
    debugger;
    e.preventDefault();
    let reminder = {
      recipientName: this.state.recipientName,
      relationship: this.state.relationship,
      occasion: this.state.occasion,
      date: this.state.date,
    };
    this.props.composeReminder(reminder).then((res) => {
      debugger;
    //   return this.props.history.push(`/reminders/${res.reminder.data._id}`);
        return this.props.history.push("/");
    });
  }

  update(field) {
    // debugger
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  render() {
    debugger;
    // this.props.fetchedReminder gets correct one
    return (
      <div className="new-reminder-outer-div">
        <Nav />
        <form onSubmit={this.handleSubmit}>
          <div className="new-reminder-container">
            <h2 className="new-reminder-greeting">
              Add another Reminder for <span className="recipient-name-span">{this.state.recipientName}</span>
            </h2>
            <br />
            {/* <p>{this.state.relationship}</p>
            <br /> */}
            {/* <input
              type="text"
              value={this.state.occasion}
              onChange={this.update("occasion")}
              placeholder="What's the occasion you need to be reminded for?"
            /> */}
            What is the occasion you need to be reminded for?
            {
              <select
                className="occasion-selector"
                id="relationship"
                value={this.state.occasion}
                onChange={this.update("occasion")}
              >
                <option value="Must Select"></option>
                <option value="Birthday">Birthday</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Other">Other</option>
              </select>
            }
            <br />
            <label for="date">Date you need to be Reminded on:</label>
            <input
              type="date"
              value={this.state.date}
              onChange={this.update("date")}
            />
            <br />
            <input
              className="new-reminder-submit-button"
              type="submit"
              value="SUBMIT"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default NewReminderRecipient;
