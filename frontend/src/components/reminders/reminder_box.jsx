import React from "react";
import { Link } from "react-router-dom"

class ReminderBox extends React.Component {

  constructor(props){
    super(props)
    this.formatDate = this.formatDate.bind(this)
  }

  formatDate(date){
    let year = date.slice(0, 4);
    let month = date.slice(5, 7);
    let day = date.slice(8, 10);
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    month = months[parseInt(month) - 1]
    return month + " " + day + ", " + year
  }

  render() {
      debugger
      let date = this.formatDate(this.props.date)
      debugger
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
