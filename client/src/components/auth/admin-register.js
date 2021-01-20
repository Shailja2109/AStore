import React, { Component } from "react";
import trolly from "../../images/trolly2.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      contact: "",
      password: "",
      password2: "",
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
      name: this.state.name,
      email: this.state.email,
      contact: this.state.contact,
      password: this.state.password,
      password2: this.state.password2,
    };
    axios
      .post("/api/users/register", user)
      .then((res) => console.log(res.data))
      .catch((err) => this.setState({ errors: err.response.data }));
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="login-div">
        <div className="login-form">
          <h1>Astore Admin</h1>
          <h4>Register to your account</h4>
          <form noValidate onSubmit={this.onSubmit}>
            <div className="form-group">
              <input
                type="text"
                className={classnames("form-control", {
                  "is-invalid": errors.name,
                })}
                placeholder="name"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>

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
                type="text"
                className={classnames("form-control", {
                  "is-invalid": errors.contact,
                })}
                placeholder="Contact number"
                name="contact"
                value={this.state.contact}
                onChange={this.onChange}
              />
              {errors.contact && (
                <div className="invalid-feedback">{errors.contact}</div>
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
              <input
                type="password"
                className={classnames("form-control", {
                  "is-invalid": errors.password2,
                })}
                placeholder="Password"
                name="password2"
                value={this.state.password2}
                onChange={this.onChange}
              />
              {errors.password2 && (
                <div className="invalid-feedback">{errors.password2}</div>
              )}
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </form>
          <p>
            Already Registered to Astore? <Link to="/admin/login">Log in.</Link>
          </p>
        </div>
        {/* <div className="login-img">
          <img src={trolly} alt="Store" />
        </div> */}
      </div>
    );
  }
}
export default Register;
