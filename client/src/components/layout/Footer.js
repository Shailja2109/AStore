import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Footer extends Component {
  render() {
    return (
      <div className="bg-dark text-white text-center p-4">
        Copyright &copy; {new Date().getFullYear()} AStore
        <Link to="/admin/dashboard">Admin Dashboard</Link>
      </div>
    );
  }
}
