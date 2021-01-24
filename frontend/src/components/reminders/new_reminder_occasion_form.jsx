import React from "react";
import Nav from "../nav/navbar";

class NewReminderOccasion extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            recipientName: "",
            relationship: "",
            occasion: "",
            dateOccasion: "",
            dateReminder: "",
            hour: "12",
            ampm: "PM",
            hourAdjustment: 12,
            errors: {},
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        // this.renderErrors = this.renderErrors.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        debugger;
        this.setState({
            fetchedReminder: nextProps.fetchedReminder,
            recipientName: nextProps.fetchedReminder.recipientName,
            relationship: nextProps.fetchedReminder.relationship,
            occasion: nextProps.fetchedReminder.occasion,
            dateOccasion: nextProps.fetchedReminder.dateOccasion,
        });
    }

    componentDidMount() {
        debugger;
        this.props.fetchReminder(this.props.match.params.reminderId);
        debugger;
        //set state
    }

    handleSubmit(e) {
        debugger;
        e.preventDefault();
        let hr = Number(this.state.hour);
        this.state.ampm == "AM"
            ? this.setState({ hourAdjustment: 0 + hr })
            : this.setState({ hourAdjustment: 12 + hr });
        let reminder = {
            recipientName: this.state.recipientName,
            relationship: this.state.relationship,
            occasion: this.state.occasion,
            dateOccasion: this.state.dateOccasion,
            dateReminder: this.state.dateReminder,
            hourAdjustment: this.state.hourAdjustment,
        };
        this.props.composeReminder(reminder).then((res) => {
            debugger;
            //   return this.props.history.push(`/reminders/${res.reminder.data._id}`);
            return this.props.history.push("/");
        });
    }

    // renderErrors() {
    //   debugger
    //   return (
    //     <ul>
    //       {Object.keys(this.state.errors).map((error, i) => (
    //         <li key={`error-${i}`}>{this.state.errors[error]}</li>
    //       ))}
    //     </ul>
    //   );
    // }

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
        let date = ""
        if(this.state.dateOccasion){
            date = this.state.dateOccasion.toString().slice(0, 10)
        }
        return (
            <div className="new-reminder-outer-div">
                <Nav />
                <form onSubmit={this.handleSubmit}>
                    <div className="new-reminder-container">
                        <h2 className="new-reminder-greeting">
                            Add another Reminder for{" "}
                            <span className="recipient-name-span">
                                {this.state.recipientName}'s {this.state.occasion}
                            </span>
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
                        <br />
                        <label for="date">Date of the occasion:</label>
                        <p>{date}</p>
                        <br />
                        <label for="date">Date you need to be Reminded on:</label>
                        <input
                            className="date-picker"
                            type="date"
                            value={this.state.dateReminder}
                            onChange={this.update("dateReminder")}
                        />
                        <br />
                        <span>What time do you want to be reminded of this occasion: </span>
                        <select
                            className="time-selector"
                            id=""
                            onChange={this.update("hour")}
                            value={this.state.hour}
                        >
                            <option value="Must Select"></option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select>
                        <select
                            className="am-pm-selector"
                            id=""
                            onChange={this.update("ampm")}
                            value={this.state.ampm}
                        >
                            <option value="Must Select"></option>
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                        </select>
                        <br />
                        <input
                            className="new-reminder-submit-button"
                            type="submit"
                            value="SUBMIT"
                        />
                    </div>
                </form>
                {/* {this.renderErrors()} */}
            </div>
        );
    }
}

export default NewReminderOccasion;
