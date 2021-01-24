import React from "react";
import { withRouter } from "react-router-dom";
import logo from "../../ExclamRedBackWhiteText.png"


class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  // Once the user has been authenticated, redirect
  componentWillReceiveProps(nextProps) {
      debugger
    if (nextProps.currentUser === true) {
      this.props.history.push(`/profile`);
    }

    // Set or clear errors
    this.setState({ errors: nextProps.errors });
  }

  // Handle field updates (called in the render method)
  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  // Handle form submission
  handleSubmit(e) {
    e.preventDefault();

    let user = {
      username: this.state.username,
      password: this.state.password,
    };

    this.props.login(user);
  }

  // Render the session errors if there are any
  // style this
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
      <div className="login-container">
        <img className="auth-logo" src={logo} alt="asdf" />
        <h2 className="login-page-header">Log In to Dog-Hous</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              className="login-username-field"
              type="text"
              value={this.state.username}
              onChange={this.update("username")}
              placeholder="Username"
            />
            <br />
            <input
              className="login-password-field"
              type="password"
              value={this.state.password}
              onChange={this.update("password")}
              placeholder="Password"
            />
            <br />
            <input
              className="login-submit-button"
              type="submit"
              value="Submit"
            />
            {this.renderErrors()}
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
