import React from 'react';
import Nav from '../nav/navbar'


class NewReminder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipientName: "",
      relationship: "",
      occasion: "",
      date: "",
      setDefaultReminders: "Yes",
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    // this.renderErrors = this.renderErrors.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    debugger;
    this.setState({ newReminder: nextProps.newReminder.occasion, errors: nextProps.errors });
  }

  componentDidUpdate(){
    debugger
  }

  handleClick(e) {
    e.preventDefault();
    if (!e.target.selected) {
      e.target.selected = true;
    } else {
      e.target.selected = false;
    }
    debugger;
  }

  handleSubmit(e) {
    debugger;
    let likes = Array.from(
      e.target.elements[4].selectedOptions,
      (option) => option.value
    );
    e.preventDefault();
    let reminder1 = {
      recipientName: this.state.recipientName,
      relationship: this.state.relationship,
      occasion: this.state.occasion,
      date: this.state.date,
      likes: likes,
    };
    // here determine if mother/father
    // add reminders for christmas, mother's day ect
    this.props
      .composeReminder(reminder1)
      .then((res) => {
        debugger;
        // return this.props.history.push(`/reminders/${res.reminder.data._id}`)
        if (!res.errors) {
          debugger
          return this.props.history.push("/");
        }else{
          debugger
          this.forceUpdate();
        }
      })
      .catch((err) => {
        debugger;
      });
  }

  update(field) {
    debugger;
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
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

  render() {
    debugger;
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
                <option value="Sister">Sister</option>
                <option value="Father">Father</option>
                <option value="Brother">Brother</option>
                <option value="Husband">Husband</option>
                <option value="Son">Son</option>
                <option value="Friend">Friend</option>
                <option value="Work Collegue">Work Collegue</option>
              </select>
            }
            <br />
            What is the occasion you need to be reminded for?
            {
              <select
                className="occasion-selector"
                id="occasion"
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
            <br />
            <div className="favorites-container">
              <label htmlFor="favorites">
                What are some of this person's favorite things
              </label>
              {
                <select
                  className="favorites-selector"
                  id="favorites"
                  size="4"
                  multiple="multiple"
                  onMouseDown={this.handleClick}
                >
                  <option className="favorite-element" value="Jewelry">
                    Jewelry
                  </option>
                  <option
                    className="favorite-element"
                    value="Athletic Clothing"
                  >
                    Athletic Clothing
                  </option>
                  <option
                    className="favorite-element"
                    value="Business Clothing"
                  >
                    Business Clothing
                  </option>
                  <option className="favorite-element" value="Outdoors">
                    Outdoors
                  </option>
                </select>
              }
            </div>
            <br />
            <div className="default-reminders-container">
              <label htmlFor="defaults">
                Automatically subscribe to reminders on special occasions such
                as Christmas for this person?
              </label>
              {
                <select
                  className="defaults-selector"
                  id="defaults"
                  value={this.state.setDefaultReminders}
                  onChange={this.update("setDefaultReminders")}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              }
            </div>
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

export default NewReminder;