import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerAdminUser } from "../../actions/authActions";

class AdminRegister extends Component {
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
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/admin/dashboard");
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const userData = {
      name: this.state.name,
      email: this.state.email,
      contact: this.state.contact,
      password: this.state.password,
      password2: this.state.password2,
    };
    this.props.registerAdminUser(userData, this.props.history);
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
      </div>
    );
  }
}

AdminRegister.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { registerAdminUser })(
  withRouter(AdminRegister)
);
