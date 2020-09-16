import React from 'react';
import ReminderBox from "../reminders/reminder_box";
import NavBar from "../nav/navbar"

class Profile extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            reminders: []
        }
    }

    componentWillMount(){
        console.log(this.props.currentUser.id)
        this.props.fetchUserReminders(this.props.currentUser.id)
    }

    componentWillReceiveProps(newState){
        this.setState({reminders: newState.reminders})
    }

    render() {
        debugger
        if(this.state.reminders.length === 0){
            return (<div>
                        <NavBar/>
                        {this.props.currentUser.username}
                        You don't have any Reminders to show yet
                        
                    </div>)
        }else{
            return(
                <div>
                    <NavBar/>
                    <h2>
                        All Reminders
                    </h2>
                    {this.state.reminders.map(reminder => (
                        <ReminderBox key={reminder._id} id={reminder._id} description={reminder.description} date={reminder.date}/>
                    ))}
                </div>
            )
        }
    }

}

export default Profile;