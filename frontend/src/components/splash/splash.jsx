import React from 'react';
import { Link } from "react-router-dom";
import img from "./DHlogo.jpg"

const Splash = () => (
  <div className="splash-container">
    {/* <h1 className="splashTitle">Dog-Hous</h1> */}
    <div className="splash">
      <div className="splash-left">
      </div>
      <div className="splash-right">
        <img className="splash-logo" src={img} alt="asdf"/>
        <h2 className="splash-descriptors">Subscribe and never get stuck in the doghouse again</h2>
        <h2 className="splash-descriptors">We'll text you before you forget that special occasion</h2>
        <h2 className="splash-descriptors">Receive special discounts through text on personalized gift ideas</h2>
        <Link to={"/signup"} className="subscribeLink"><h4 className="subscribeText">Subscribe Now</h4></Link>
        <h4 className="splash-descriptors">Already subscribed?</h4>
        <Link to={"/login"}><h4 className="loginText">Login</h4></Link>
      </div>
    </div>
    <div className="footer">
        <p>About</p>
      <p>Contact</p>
      <p>Advertise with Us</p>
      <p>Cookies</p>
      <p>Terms</p>
      <p>Privacy Policy</p>
      <p>Careers</p>
      <p>Settings</p>
      <p>Directory</p>
    </div>
    <div className="Copyright">
      © 2020 A Inc Production
    </div>
  </div>
);

export default Splash;