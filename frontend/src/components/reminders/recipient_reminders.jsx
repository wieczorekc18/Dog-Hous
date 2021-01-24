import React, { useState } from "react";
import ReminderBox from "../reminders/reminder_box";
import NavBar from "../nav/navbar";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import NewReminderContainer from "../reminders/new_reminder_container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const star = <FontAwesomeIcon icon={faStar} />;
const pen = <FontAwesomeIcon icon={faPen} />;
const bell = <FontAwesomeIcon icon={faBell} />;
const trash = <FontAwesomeIcon icon={faTrashAlt} />;

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reminders: [],
      sortedReminders: {},
      recipient: "",
      relationship: "",
      fetchedId: "",
    };

    this.handleDestroy = this.handleDestroy.bind(this);
    this.formatDate = this.formatDate.bind(this)
  }

  componentWillMount() {
    debugger;
    this.props.fetchReminder(this.props.match.params.reminderId)
        .then(res => {
            debugger 
            this.setState({ 
                relationship: res.reminder.data.relationship,
                recipient: res.reminder.data.recipientName,
                fetchedId: res.reminder.data._id,
            });
            debugger
        })
    this.props.fetchUserReminders(this.props.currentUser.id)
        .then(res => {
            debugger 
            this.setState({reminders: res.reminders.data})
            let sorted = {};
            let key;
            this.state.reminders.forEach((r) => {
              if(this.state.recipient === r.recipientName){
                key = r.recipientName + r.occasion
                debugger;
                if (sorted[key]) {
                    debugger;
                    sorted[key].push(r);
                } else {
                    debugger;
                    sorted[key] = [r]
                }
              }
            });

            this.setState({ sortedReminders: sorted });
        })
  }

  componentWillReceiveProps(newState) {
    debugger;
    // set recipient using setstate
    this.setState({ reminders: newState.reminders, });
    if (newState.fetchedReminder){
        console.log(newState.fetchedReminder.recipientName);
        this.setState({ recipient: newState.fetchedReminder.recipientName });
    }
    debugger;
  }

//   componentDidUpdate(prevProps) {
//     debugger;
//     if (prevProps.reminders.length !== this.props.reminders.length) {
//       let sorted = {};
//       this.state.reminders.forEach((r) => {
//         debugger;
//         if (this.state.recipient == r.recipientName){
//           if (sorted[r.recipientName]) {
//             debugger;
//             sorted[r.recipientName].push(r);
//           } else {
//             debugger;
//             sorted[r.recipientName] = [r];
//           }
//         }
//       });
//       this.setState({ sortedReminders: sorted });
//     }
//     debugger;
//   }

  formatDate(date) {
    let year = date.slice(0, 4);
    let month = date.slice(5, 7);
    let day = date.slice(8, 10);
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    month = months[parseInt(month) - 1]
    return month + " " + day + ", " + year
  }

  handleDestroy(id) {
    debugger;
    this.props
      .destroyReminder(id)
      .then((res) => {
        debugger;
        // return this.props.history.push(`/reminders/${res.reminder.data._id}`)
        this.forceUpdate();
        return this.props.history.push("/");
      })
      .catch((err) => {
        debugger;
      });
  }

    render() {
        debugger;
        return (
            <div className="recipient-page-container">
                <NavBar />
                <div className="recipient-page-center-container">
                    <h2 className="recipient-page-heading">
                        {this.state.recipient} ({this.state.relationship  })
                    </h2>
                    <Link
                        className="link-to-new-for-existing"
                        to={`/reminders/add/${this.state.fetchedId}`}
                    >
                        <span className="add-another">Add another reminder for {this.state.recipient}</span>
                    </Link>
                    
                    {/* {this.state.reminders.map(reminder => (
                                <ReminderBox key={reminder._id} id={reminder._id} recipientName={reminder.recipientName} date={reminder.date}/>
                                ))} */}
                    {Object.keys(this.state.sortedReminders).map((key) => (
                        <div className="recipient-page-reminderContainer">
                        <h2>
                          {this.state.sortedReminders[key][0].occasion} {this.formatDate(this.state.sortedReminders[key][0].dateOccasion)}
                        </h2>
                        {this.state.sortedReminders[key].map((reminder) => (
                            <div className="reminder-box-container">
                                {/* add the occasion up here reformat so 
                                each occasion has list of reminders
                                associated with it */}
                                <ReminderBox
                                    key={reminder._id}
                                    id={reminder._id}
                                    recipientName={reminder.recipientName}
                                    occasion={reminder.occasion}
                                    date={reminder.dateReminder}
                                />
                                <Link to={`/reminders/addOccasion/${this.state.fetchedId}`} className="plus-sign">
                                +
                                </Link>
                                <button
                                    className="reminder-delete-button"
                                    onClick={() =>
                                        this.handleDestroy(reminder._id)
                                    }
                                    >
                                    <span>{trash}</span>
                                </button>
                            </div>
                        ))}
                        </div>
                    ))}

                    {/* <button onClick={() => setModalIsOpen(true)}>+ Add a New Person</button> */}
                    {/* <Modal isOpen={modalIsOpen}> */}
                    {/* <NewReminderContainer/> */}
                    {/* <button onClick={() => setModalIsOpen(false)}>close</button> */}
                    {/* </Modal> */}

                    <br />
                    {/* <button>
                                    Refer a friend to this service
                                </button> */}
                </div>
            </div>
        );
    }
}

export default Profile;
