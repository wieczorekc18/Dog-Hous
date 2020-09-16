import React from 'react';


class NewReminder extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            description: "",
            date: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        debugger
        this.setState({newReminder: nextProps.newReminder.description})
    }

    handleSubmit(e){
        debugger
        e.preventDefault();
        let reminder = {
            description: this.state.description,
            date: this.state.date
        }
        this.props.composeReminder(reminder)
            .then(res => {
                debugger
                return this.props.history.push(`/reminders/${res.reminder.data._id}`)
            })
    }

    update(field){
        // debugger
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }

    render() {
        return (
          <div>
            <form onSubmit={this.handleSubmit}>
              <div>
                <input
                  type="text"
                  value={this.state.description}
                  onChange={this.update("description")}
                  placeholder="What do you need to be Reminded of?"
                />
                <br />
                <label for="date">Date you need to be Reminded on:</label>
                <input
                  type="date"
                  value={this.state.date}
                  onChange={this.update("date")}
                />
                <input type="submit" value="SUBMIT"/>
              </div>
            </form>
          </div>
        );
    }

}

export default NewReminder;