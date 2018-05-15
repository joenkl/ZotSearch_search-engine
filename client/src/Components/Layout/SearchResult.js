import React, { Component } from "react";

export default class SearchResult extends Component {
  render() {
    return (
      <div className="jumbotron jumbotron-fluid bg-light">
        <div className="container">
          <h3 className="display-3">Result:</h3>
          <div className="container-fluid">
            <p className="container-fluid">
              {this.props.location.state.data[0]}
            </p>
            <p className="container-fluid">
              {this.props.location.state.data[1]}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
