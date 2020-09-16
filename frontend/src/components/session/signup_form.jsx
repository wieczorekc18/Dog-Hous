import React from 'react'
import { withRouter } from 'react-router-dom'

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      number: "",
      password: "",
      password2: "",
      errors: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErorrs = false;
  }

  componentWillReceiveProps(nextProps) {
      debugger
    if (nextProps.signedIn === true) {
      this.props.history.push("./profile");
    }

    this.setState({ errors: nextProps.errors });
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      username: this.state.username,
      number: this.state.number,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.signup(user)
        .then((res) => {
            debugger
            this.props.login(user)})
            // return this.props.history.push("/login")})
        .catch((err) => {
          debugger
        })
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>{this.state.errors[error]}</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="signup-form-container">
        <form onSubmit={this.handleSubmit}>
          <div className="signup-form">
            <br />
            <input
              type="text"
              value={this.state.username}
              onChange={this.update("username")}
              placeholder="Username"
            />
            <br />
            <input
              type="text"
              value={this.state.number}
              onChange={this.update("number")}
              placeholder="Phone Number"
            />
            <br />
            <input
              type="password"
              value={this.state.password}
              onChange={this.update("password")}
              placeholder="Password"
            />
            <br />
            <input
              type="password"
              value={this.state.password2}
              onChange={this.update("password2")}
              placeholder="Confirm Password"
            />
            <br />
            <input type="submit" value="Submit" />
            {this.renderErrors()}
          </div>
        </form>
      </div>
    );
  }
}

export default SignupForm;