import React, { Component } from "react";
import trolly from "../../images/trolly3.jpg";

class login extends Component {
  render() {
    return (
      <div className="login-div">
        <div className="login-form">
          <h1>Astore</h1>
          <h4>LogIn to your account </h4>
          <form>
            <input type="text" />
          </form>
        </div>
        <div className="login-img">
          <img src={trolly} alt="Store" />
        </div>
      </div>
    );
  }
}
export default login;
