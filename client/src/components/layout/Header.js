import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logOutUser } from "../../actions/authActions";
import classnames from "classnames";

class Header extends Component {
  onLogOutClick(e) {
    e.preventDefault();
    this.props.logOutUser();
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const LogInLinks = (
      <Link className="nav-links" to="/login">
        Log In
      </Link>
    );
    const LogOutLinks = (
      <a className="nav-links" href="" onClick={this.onLogOutClick.bind(this)}>
        <img
          className="rounded-circle"
          src={user.avatar}
          alt={user.name}
          style={{ width: "25px", marginRight: "25px" }}
        />
        Logout
      </a>
    );
    return (
      <nav
        className={classnames("navbar navbar-dark bg-warning", {
          "bg-dark": user.role != "admin",
        })}
      >
        <div class="container-fluid">
          <Link className="navbar-brand" to="/">
            Astore
          </Link>
          <div className="pull-right">
            {isAuthenticated ? LogOutLinks : LogInLinks}
          </div>
        </div>
      </nav>
    );
  }
}
Header.propTypes = {
  logOutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logOutUser })(Header);
