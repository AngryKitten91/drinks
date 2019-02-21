import React, { Component } from "react";
import "./App.css";
import List from 'components/List';


import Auth from 'components/hocs/Auth'

import Login from 'components/Login';

class App extends Component {
  render() {
    const {user} = this.props;
    return (
      <div className="App">
       <Login />
       <List />

      </div>
    );
  }
}

export default Auth(App);
