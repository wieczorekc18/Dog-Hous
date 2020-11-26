import React from "react";

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
      return this.props.history.push(`/reminders/${res.reminder.data._id}`);
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
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <p>{this.state.recipientName}</p>
            <br />
            <p>{this.state.relationship}</p>
            <br />
            <input
              type="text"
              value={this.state.occasion}
              onChange={this.update("occasion")}
              placeholder="What's the occasion you need to be reminded for?"
            />
            <br />
            <label for="date">Date you need to be Reminded on:</label>
            <input
              type="date"
              value={this.state.date}
              onChange={this.update("date")}
            />
            <input type="submit" value="SUBMIT" />
          </div>
        </form>
      </div>
    );
  }
}

export default NewReminderRecipient;
