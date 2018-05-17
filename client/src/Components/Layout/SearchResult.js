import React, { Component } from "react";
import { Link } from "react-router-dom";

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
              {(endTime - this.props.location.state.startTime) / 1000.0}s
            </p>
            {this.props.location.state.data.map(item => {
              // console.log(item);
              return (
                <div className="container-fluid col-sm">
                  <ul key={item._id.toString()}>
                    <ul>
                      Title: <strong>{item.title}</strong>
                    </ul>
                    <ul>
                      <Link to={item.url}>{item.url}</Link>
                    </ul>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
