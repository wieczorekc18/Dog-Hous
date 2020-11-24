import React from 'react';
import ReminderBox from "../reminders/reminder_box";
import NavBar from "../nav/navbar"
import { Link } from "react-router-dom";

class Profile extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            reminders: [],
            sortedReminders: {}
        }

        this.sortReminders = this.sortReminders.bind(this)
    }

    componentWillMount(){
        debugger
        console.log(this.props.currentUser.id)
        this.props.fetchUserReminders(this.props.currentUser.id)
    }

    componentWillReceiveProps(newState){
        debugger
        this.setState({reminders: newState.reminders})
        debugger
    }

    componentDidUpdate(prevProps){
        debugger
        if(prevProps.reminders.length !== this.props.reminders.length)
        {
            let sorted = {}
            // this.state.reminders.forEach(r => {
            //     if (this.state.sortedReminders[r.recipientName]) {
            //         this.state.sortedReminders[r.recipientName].push(r)
            //     } else {
            //         this.state.sortedReminders[r.recipientName] = [r]
            //     }
            // })
            this.state.reminders.forEach(r => {
                debugger
                if (sorted[r.recipientName]) {
                    debugger
                    sorted[r.recipientName].push(r)
                } else {
                    debugger
                    sorted[r.recipientName] = [r]
                }
            })
            this.setState({sortedReminders: sorted})
        }
        debugger
    }

    sortReminders(reminders){
        debugger
        let sorted = {}
        // reminders.forEach(r => {
        //     if(this.state.sortedReminders[r.recipientName]){
        //         this.state.sortedReminders[r.recipientName].push(r.occasion)
        //     }else{
        //         this.state.sortedReminders[r.recipientName] = [r.occasion]
        //     }
        // })
        debugger
        return sorted
    }

    render() {
        debugger
        if(this.state.reminders.length === 0){
            return (<div>
                        <NavBar/>
                        {this.props.currentUser.name}
                        You don't have any Reminders to show yet
                        
                    </div>)
        }else{
            debugger
            // let sorted = this.sortReminders(this.state.reminders)
            debugger
            return(
                <div>
                    <NavBar/>
                    <h2>
                        What's up {this.props.currentUser.name}?
                    </h2>
                    <br/>
                    <h2>
                        Here's a list of the people you need to keep happy to stay out of the Dog Hous
                    </h2>
                    {/* {this.state.reminders.map(reminder => (
                        <ReminderBox key={reminder._id} id={reminder._id} recipientName={reminder.recipientName} date={reminder.date}/>
                    ))} */}
                    {Object.keys(this.state.sortedReminders).map(recipient => (
                        <div className="reminderContainer">
                            <h3>{recipient}</h3>
                            {this.state.sortedReminders[recipient].map(reminder => (
                                <div>
                                  <ReminderBox
                                    key={reminder._id}
                                    id={reminder._id}
                                    recipientName={reminder.recipientName}
                                    occasion={reminder.occasion}
                                    date={reminder.date}
                                  />
                                </div>
                            ))}
                            <Link to={`/reminders/new/${recipient}`}>+ Add another reminder for {recipient}</Link>
                        </div>
                    ))}
                    <Link to={"/reminders/new"}>+ Add a New Person</Link>
                    <br/>
                    <button>
                        Refer a friend to this service
                    </button>
                </div>
            )
        }
    }

}

export default Profile;