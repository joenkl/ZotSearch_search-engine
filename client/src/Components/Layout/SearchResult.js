import React, { Component } from "react";

export default class SearchResult extends Component {
  render() {
    var endTime = Date.now();
    return (
      <div className="jumbotron jumbotron-fluid bg-light">
        <div className="container">
          <h3 className="display-6">Result:</h3>
          <div className="container-fluid">
            <p>
              There are {this.props.location.state.size} results found in{" "}
              {endTime - this.props.location.state.startTime}ms
            </p>
            {this.props.location.state.data.map(item => {
              // console.log(item);
              return (
                <ul key={item.toString()}>
                  - {item[0]}, {item[1]}, {item[2]}
                </ul>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
