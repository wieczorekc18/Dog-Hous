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

const star = <FontAwesomeIcon icon={faStar} />;
const pen = <FontAwesomeIcon icon={faPen} />;
const bell = <FontAwesomeIcon icon={faBell} />;

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reminders: [],
      sortedReminders: {},
      recipient: "",
      relationship: "",
    };

    this.handleDestroy = this.handleDestroy.bind(this);
  }

  componentWillMount() {
    debugger;
    this.props.fetchReminder(this.props.match.params.reminderId)
        .then(res => {
            debugger 
            this.setState({ 
                relationship: res.reminder.data.relationship,
                recipient: res.reminder.data.recipientName
            });
        })
    this.props.fetchUserReminders(this.props.currentUser.id)
        .then(res => {
            debugger 
            this.setState({reminders: res.reminders.data})
            let sorted = {};
            this.state.reminders.forEach((r) => {
              debugger;
              if (this.state.recipient == r.recipientName) {
                if (sorted[r.recipientName]) {
                  debugger;
                  sorted[r.recipientName].push(r);
                } else {
                  debugger;
                  sorted[r.recipientName] = [r];
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
            <div className="profile-container">
                <NavBar />
                <div className="profile-center-container">
                    <h2 className="profile-greeting">
                    What's up {this.props.currentUser.name}?
                    </h2>
                    {/* {this.state.reminders.map(reminder => (
                                <ReminderBox key={reminder._id} id={reminder._id} recipientName={reminder.recipientName} date={reminder.date}/>
                                ))} */}
                    <ul className="profile-recipient-ul">
                    {Object.keys(this.state.sortedReminders).map((recipient) => (
                        <div className="reminderContainer">
                        <li className="recipient-li">
                            <div>
                            <Link
                                className="link-recipient-page"
                                to={`/reminders/recipient/${this.state.sortedReminders[recipient][0]._id}`}
                            >
                                <p>{recipient}</p>
                            </Link>
                            </div>
                            <div className="recipient-li-icons">
                            <span className="star-icon">
                                {star} {this.state.sortedReminders[recipient].length}{" "}
                            </span>
                            <Link
                                className="link-to-existing"
                                to={`/reminders/add/${this.state.sortedReminders[recipient][0]._id}`}
                            >
                                <span className="add-another">{pen}</span>
                            </Link>
                            </div>
                        </li>
                        {this.state.sortedReminders[recipient].map((reminder) => (
                            <div className="reminderBox">
                                <button
                                    className="reminder-delete-button"
                                    onClick={() =>
                                        this.handleDestroy(reminder._id)
                                    }
                                    >
                                    x
                                </button>
                                <ReminderBox
                                    key={reminder._id}
                                    id={reminder._id}
                                    recipientName={reminder.recipientName}
                                    occasion={reminder.occasion}
                                    date={reminder.date}
                                />
                            </div>
                        ))}
                        </div>
                    ))}
                    </ul>

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
