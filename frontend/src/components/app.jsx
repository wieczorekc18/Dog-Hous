import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import NavBarContainer from "./nav/navbar_container";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import Splash from "./splash/splash";
import SignupFormContainer from "./session/signup_form_container";
import LoginFormContainer from "./session/login_form_container";

const MainApp = () => (
  <div>
    <Switch>
      <AuthRoute exact path="/" component={Splash} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
    </Switch>
  </div>
);

export default MainApp;
