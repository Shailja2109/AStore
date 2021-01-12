import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <div className="bg-dark text-white text-center mt-5 p-4">
        Copyright &copy; {new Date().getFullYear()} AStore
      </div>
    );
  }
}
