import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
class Searchbar extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const searchObj = {
      docid: this.state.query
    };

    axios
      .post("/search", searchObj)
      .then(res => {
        const result = {
          pathname: "/result",
          state: { data: [res.data.url, res.data.docid] }
        };
        this.props.history.push(result);
      })
      .catch(err => {
        this.props.history.push("/notfound");
      });
  }
  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light">
          <Link className="navbar-brand" to="/">
            Zot Search
          </Link>
          <form
            onSubmit={this.onSubmit}
            className="form-inline my-2 my-lg-0 col-md"
          >
            <input
              className="form-control mr-sm-2 col-md"
              type="search"
              placeholder="Search..."
              name="query"
              value={this.state.query}
              onChange={this.onChange}
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </nav>
      </div>
    );
  }
}

export default withRouter(Searchbar);
