import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <nav class="navbar navbar-dark  bg-dark">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/">
            Astore
          </Link>
          <div className="pull-right">
            <Link className="nav-links" to="/login">
              LogIn
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}
export default Header;
