import React, { Component } from "react";
import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

//import Layouts
import Searchbar from "./Components/Layout/Searchbar";
import Landing from "./Components/Layout/Landing";
import Footer from "./Components/Layout/Footer";
import Result from "./Components/Layout/SearchResult";
import NoResult from "./Components/Layout/NoResult";
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Searchbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/result" component={Result} />
          <Route exact path="/notfound" component={NoResult} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
