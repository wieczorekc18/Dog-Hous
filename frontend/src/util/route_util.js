import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";

// Passed in from parent component or from mapStateToProps
const Auth = ({ component: Component, path, loggedIn, exact }) => {
    debugger
    return(
    <Route
        path={path}
        exact={exact}
        render={(props) =>
        !loggedIn ? (
            <Component {...props} />
        ) : (
            // Redirect to the profile page if the user is authenticated
            <Redirect to="/profile" />
        )
        }
    />
)};

const Protected = ({ component: Component, loggedIn, ...rest }) => {
    debugger
    return(
        <Route
            {...rest}
            render={(props) =>
            loggedIn ? (
                <Component {...props} />
            ) : (
                // Redirect to the login page if the user is not already authenticated
                <Redirect to="/login" />
            )
            }
        />
    )
};

// Use the isAuthenitcated slice of state to determine whether a user is logged in

const mapStateToProps = (state) => ({
  loggedIn: state.session.isAuthenticated,
});

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));

export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));