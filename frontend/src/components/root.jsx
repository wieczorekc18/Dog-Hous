import React from "react";

import App from "./app";
import { HashRouter, Switch } from "react-router-dom";
import { Provider } from "react-redux";
// import { AuthRoute, ProtectedRoute } from "../util/auth/route_util";
import SignupContainer from "./session/login_form_container";
import LoginContainer from "./session/signup_form_container";

const Root = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
       {/* <Switch> */}
        {/* <AuthRoute exact path="/login" component={LoginContainer} />
        <AuthRoute exact path="/signup" component={SignupContainer} /> */}
        <App />
      {/* </Switch>  */}
    </HashRouter>
  </Provider>
);

export default Root;
