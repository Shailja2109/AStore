import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <div className="bg-dark text-white text-center p-4">
        Copyright &copy; {new Date().getFullYear()} AStore
      </div>
    );
  }
}
