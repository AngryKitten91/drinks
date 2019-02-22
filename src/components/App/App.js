import React, { Component } from "react";
import "./App.scss";

import { BrowserRouter as Router, Route } from "react-router-dom";

import List from "components/List";
import Auth from "components/hocs/Auth";
import Login from "components/Login";
import AddNew from "components/AddNew";

class App extends Component {
  render() {
    const { user } = this.props;
    return (
      <Router>
        <div className="App">
          <Route path="/" component={Login} />
          <Route path="/list/:Id?" component={List} />
          <Route exact path="/" component={List} />
          <Route exact path="/add" component={AddNew} />
        </div>
      </Router>
    );
  }
}

export default Auth(App);
