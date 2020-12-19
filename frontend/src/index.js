import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import jwt_decode from "jwt-decode";
import { setAuthToken } from "./util/session_api_util";
import axios from "axios"
import configureStore from "./store/store"
import Root from "./components/root"
import { logout } from "./actions/session_actions";
import'./styles/splash.css';
import "./styles/login.css";
import "./styles/register.css";
import "./styles/profile.css";
import "./styles/show.css";
import "./styles/new.css";
import "./styles/recip_reminders.css";


document.addEventListener('DOMContentLoaded', () => {
  let store;

  // If a returning user has a session token stored in localStorage
  if (localStorage.jwtToken) {

    // Set the token as a common header for all axios requests
    setAuthToken(localStorage.jwtToken);

    // Decode the token to obtain the user's information
    const decodedUser = jwt_decode(localStorage.jwtToken);

    // Create a preconfigured state we can immediately add to our store
    const preloadedState = { session: { isAuthenticated: true, user: decodedUser } };

    store = configureStore(preloadedState);

    const currentTime = Date.now() / 1000;

    // If the user's token has expired
    if (decodedUser.exp < currentTime) {
      // Logout the user and redirect to the splash page
      store.dispatch(logout());
      window.location.href = '/';
    }
  } else {
    // If this is a first time user, start with an empty store
    store = configureStore({});
  }
  // Render our root component and pass in the store as a prop
  const root = document.getElementById('root');

  ReactDOM.render(<Root store={store} />, root);
});
// document.addEventListener("DOMContentLoaded", () => {

//   let preloadedState = undefined;

  
//   const store = configureStore(preloadedState);
//   const root = document.getElementById("root");
  
//   window.axios = axios;
  
//   // ReactDOM.render(
//   //   <React.StrictMode>
//   //     <App />
//   //   </React.StrictMode>,
//   //   document.getElementById('root')
//   // );
//   ReactDOM.render(
//     <Root store = {store} />, root
//   );
// })

