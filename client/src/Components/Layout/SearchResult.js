import React, { Component } from "react";

export default class SearchResult extends Component {
  render() {
    var endTime = Date.now();
    return (
      <div className="jumbotron jumbotron-fluid bg-light">
        <div className="container">
          <h3 className="display-6">
            Result for <strong>"{this.props.location.state.searchWord}"</strong>:
          </h3>
          <div className="container-fluid">
            {this.props.location.state.size < 30 ? (
              <p>
                There are {this.props.location.state.size} results found in{" "}
                {(endTime - this.props.location.state.startTime) / 1000.0}s
              </p>
            ) : (
              <p>
                There are {this.props.location.state.size} <strong>best</strong>{" "}
                results found in{" "}
                {(endTime - this.props.location.state.startTime) / 1000.0}s
              </p>
            )}
            {this.props.location.state.data.map(item => {
              // console.log(item);
              return (
                <ul key={item._id.toString()}>
                  <ul className="list-group">
                    <li>
                      {item.title === "" ? (
                        <strong>No Title</strong>
                      ) : (
                        <strong>{item.title}</strong>
                      )}
                    </li>
                    <li>
                      <a
                        className="urlLink"
                        href={"http://" + item.url}
                        target="_blank"
                      >
                        {item.url}
                      </a>
                    </li>
                  </ul>
                </ul>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
