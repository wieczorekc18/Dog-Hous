import React from 'react'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDog } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const dog = <FontAwesomeIcon icon={faDog} />;
const house = <FontAwesomeIcon icon={faHome} />;

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      name: "",
      number: "",
      password: "",
      password2: "",
      errors: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
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
      name: this.state.name,
      number: this.state.number,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.signup(user)
        .then((res) => {
            debugger
            if(res.errors){
              return res.errors
            }else{
              this.props.login(user)
            }
            // return this.props.history.push("/login")})
        })
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
        <h1 className="login-icons">{dog} {house}</h1>
        <h2 className="signup-header">Create Your Dog-Hous Account</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="signup-form">
            <br />
            <input
              className="signup-username-field"
              type="text"
              value={this.state.username}
              onChange={this.update("username")}
              placeholder="Username"
            />
            <br />
            <input
              className="signup-username-field"
              type="text"
              value={this.state.name}
              onChange={this.update("name")}
              placeholder="Your name"
            />
            <br />
            <input
              className="signup-username-field"
              type="text"
              value={this.state.number}
              onChange={this.update("number")}
              placeholder="Phone Number"
            />
            <br />
            <input
              className="signup-username-field"
              type="password"
              value={this.state.password}
              onChange={this.update("password")}
              placeholder="Password"
            />
            <br />
            <input
              className="signup-username-field"
              type="password"
              value={this.state.password2}
              onChange={this.update("password2")}
              placeholder="Confirm Password"
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

export default SignupForm;