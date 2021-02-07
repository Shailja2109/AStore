import React, { Component } from "react";
import trolly from "../../images/trolly3.jpg";
import { Link } from "react-router-dom";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      if (this.props.auth.user.role === "admin") {
        this.props.history.push("/admin/dashboard");
      } else {
        this.props.history.push("/");
      }
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData);
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="login-div">
        <div className="login-form">
          <h1>Astore</h1>
          <h4>LogIn to your account</h4>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <input
                type="email"
                className={classnames("form-control", {
                  "is-invalid": errors.email,
                })}
                placeholder="Email"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div className="form-group">
              <input
                type="password"
                className={classnames("form-control", {
                  "is-invalid": errors.password,
                })}
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
          <p>
            New to Astore? <Link to="/register">Create an account.</Link>
          </p>
        </div>
        <div className="login-img">
          <img src={trolly} alt="Store" />
        </div>
      </div>
    );
  }
}

login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { loginUser })(login);
