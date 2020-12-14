import React from "react";
import { Link } from "react-router-dom"

class ReminderBox extends React.Component {
  render() {
      debugger
      let date = this.props.date.slice(5,10)
    return (
      <div className="reminder-box">
        {/* <Link to={`/reminders/${this.props.id}`}> */}
          <p>{this.props.occasion}: {date}</p>
          <br />
          {/* <h3>{this.props.recipientName}</h3> */}
        {/* </Link> */}
      </div>
    );
  }
}

export default ReminderBox;
