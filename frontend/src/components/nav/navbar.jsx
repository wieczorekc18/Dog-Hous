
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";
import { withRouter } from "react-router";

const mapStateToProps = (state) => {
  debugger;
  return {
    loggedIn: state.session.isAuthenticated,
    currentUser: state.session.user,
  };
};

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
        <div className="links-container">
          {/* <p className="username-navbar">{this.props.currentUser.username}</p> */}
          <Link to={"/profile"} className="profile-link">
            Profile
          </Link>
          <br />
          <button onClick={this.logoutUser} className="logout-link">
            Logout
          </button>
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
      <div className="nav-container">
        <p className="nav-circle"></p>
        <h1 className="nav-dh-title">Dog-Hous</h1>
        {this.getLinks()}
      </div>
    );
  }
}

// export default NavBar;
export default withRouter(connect(mapStateToProps, { logout })(NavBar))
