import React from "react";
import { Link } from "react-router-dom";

class ShowReminder extends React.Component {
    constructor(props){
        super(props);

        this.handleDestroy = this.handleDestroy.bind(this)
    }
    componentDidMount() {
        debugger
        this.props.fetchReminder(this.props.match.params.reminderId);
    }

    componentDidUpdate(prevProps) {
        debugger
        
        if (!prevProps.reminder || prevProps.reminder._id != this.props.match.params.reminderId) {
        this.props.fetchReminder(this.props.match.params.reminderId);
        }
    }

    handleDestroy(id){
        debugger
        this.props.destroyReminder(id)
            .then(res => {
                debugger
                // return this.props.history.push(`/reminders/${res.reminder.data._id}`)
                return this.props.history.push("/")
            })
    }

    render() {
        debugger
        const { reminder } = this.props;
        if (!reminder) {
        return <div>Loading...</div>;
        }
        debugger
        let id = reminder._id
        return (
          <div>
            <h3>
              You made this reminder because {reminder.recipientName} your {reminder.relationship} has a {reminder.occasion} coming up
            </h3>
            <h4>On the Date: {reminder.date}</h4>
            <Link to="/">Back to Home </Link>
            {/* <button onClick={() => this.props.destroyReminder(id).then(this.props.history.push("/"))}>Delete</button> */}
            <button onClick={() => this.handleDestroy(id)}>Delete</button>

          </div>
        );
    }
}

export default ShowReminder;
