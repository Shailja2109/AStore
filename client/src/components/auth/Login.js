import React, { Component } from "react";
import trolly from "../../images/trolly3.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import classnames from "classnames";

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
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post("/api/users/login", user)
      .then((res) => console.log(res.data))
      .catch((err) => this.setState({ errors: err.response.data }));
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
export default login;
