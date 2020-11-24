import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import NavBarContainer from "./nav/navbar_container";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import Splash from "./splash/splash";
import SignupFormContainer from "./session/signup_form_container";
import LoginFormContainer from "./session/login_form_container";
import ProfileContainer from "./profile/profile_container"
import NewReminderContainer from "./reminders/new_reminder_container"
import ShowReminderContainer from "./reminders/show_reminder_container"
import NewReminderRecipientContainer from "./reminders/new_reminder_recipient_container"

const MainApp = () => (
  <div>
    <Switch>
      <AuthRoute exact path="/" component={Splash} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      {/* <ProtectedRoute exact path="/profile" component={NavBarContainer} /> */}
      <ProtectedRoute exact path="/profile" component={ProfileContainer} />
      <ProtectedRoute exact path="/reminders/new" component={NewReminderContainer} />
      <ProtectedRoute exact path="/reminders/new/:recipient" component={NewReminderRecipientContainer} />
      <ProtectedRoute exact path="/reminders/:reminderId" component={ShowReminderContainer} />
      {/* <ProtectedRoute path="/reminders/:reminderId/edit" component={EditReminderFormContainer} /> */}
    </Switch>
  </div>
);

export default MainApp;
