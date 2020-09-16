import React from "react";
import { Link } from "react-router-dom"

class ReminderBox extends React.Component {
  render() {
      debugger
    return (
      <div className="reminderBox">
        <Link to={`/reminders/${this.props.id}`}>
          <p>REMINDER FOR {this.props.date}</p>
          <br />
          <h3>{this.props.description}</h3>
        </Link>
      </div>
    );
  }
}

export default ReminderBox;
