import React from 'react';
import Nav from '../nav/navbar'


class NewReminder extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            recipientName: "",
            relationship: "",
            occasion: "",
            date: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        debugger
        this.setState({newReminder: nextProps.newReminder.occasion})
    }

    handleSubmit(e){
        debugger
        e.preventDefault();
        let reminder = {
            recipientName: this.state.recipientName,
            relationship: this.state.relationship,
            occasion: this.state.occasion,
            date: this.state.date
        }
        this.props.composeReminder(reminder)
            .then(res => {
                debugger
                // return this.props.history.push(`/reminders/${res.reminder.data._id}`)
                return this.props.history.push("/")
            })
    }

    update(field){
        // debugger
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }

    render() {
      debugger
        return (
          <div className="new-reminder-outer-div">
            <Nav />
            <form className="new-reminder-form" onSubmit={this.handleSubmit}>
              <div className="new-reminder-container">
                <input
                  className="name-input-field"
                  type="text"
                  value={this.state.recipientName}
                  onChange={this.update("recipientName")}
                  placeholder="Who is this reminder for?"
                />
                <br />
                {/* <input
                  className="new-relationship-input-field"
                  type="text"
                  value={this.state.relationship}
                  onChange={this.update("relationship")}
                  placeholder="What is your relationship to this person?"
                /> */}
                What is your relationship to this person?
                {
                  <select
                    className="relationship-selector"
                    id="relationship"
                    value={this.state.relationship}
                    onChange={this.update("relationship")}
                  >
                    <option value="Must Select"></option>
                    <option value="Girlfriend">Girlfriend</option>
                    <option value="Wife">Wife</option>
                    <option value="Daughter">Daughter</option>
                    <option value="Mother">Mother</option>
                  </select>
                }
                <br />
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
                {/* <input
                  type="text"
                  value={this.state.occasion}
                  onChange={this.update("occasion")}
                  placeholder="What's the occasion you need to be reminded for?"
                /> */}
                <br />
                <label for="date">Date you need to be Reminded on:</label>
                <input
                  className="date-picker"
                  type="date"
                  value={this.state.date}
                  onChange={this.update("date")}
                />
                <br/>
                <input className="new-reminder-submit-button" type="submit" value="SUBMIT" />
              </div>
            </form>
          </div>
        );
    }

}

export default NewReminder;