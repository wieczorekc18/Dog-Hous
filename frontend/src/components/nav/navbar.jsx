
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";
import { withRouter } from "react-router";

const mapStateToProps = (state) => ({
  loggedIn: state.session.isAuthenticated,
});

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
      debugger
    if (this.props.loggedIn) {
      return (
        <div>
          <Link to={"/profile"}>Profile</Link>
          <br/>
          <Link to={"/reminders/new"}>Make a Reminder</Link>
          <br/>
          <button onClick={this.logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div>
          <Link to={"/signup"}>Signup</Link>
          <Link to={"/login"}>Login</Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h1>Dog-Hous</h1>
        {this.getLinks()}
      </div>
    );
  }
}

// export default NavBar;
export default withRouter(connect(mapStateToProps, { logout })(NavBar))
