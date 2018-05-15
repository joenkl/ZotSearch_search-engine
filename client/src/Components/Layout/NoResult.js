import React, { Component } from "react";

export default class NoResult extends Component {
  render() {
    return (
      <div className="jumbotron jumbotron-fluid bg-light">
        <div className="container">
          <h3 className="display-3">Result:</h3>
          <p>No URL Found</p>
        </div>
      </div>
    );
  }
}
