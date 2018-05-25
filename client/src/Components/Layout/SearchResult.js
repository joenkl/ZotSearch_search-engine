import React, { Component } from "react";

export default class SearchResult extends Component {
  render() {
    var endTime = Date.now();
    const timeSpentSec =
      (endTime - this.props.location.state.startTime) / 1000.0;
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
                {timeSpentSec}s
              </p>
            ) : (
              <p>
                There are {this.props.location.state.size} <strong>best</strong>{" "}
                results found in {timeSpentSec}s
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
                    <li className="link-score">
                      Final Score: {item.finalScore.toFixed(2)}, Found:{" "}
                      {item.matchWords} words, TF-IDF: {item.tfidf.toFixed(2)},
                      Tag Score {item.tagScore.toFixed(2)}
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
