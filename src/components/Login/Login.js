import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Login.scss";

import { signInWithGoogle } from "../../firebase";
import { signOut } from "../../firebase";

import withUser from "components/hocs/WithUser";

class Login extends Component {
  render() {
    const { user } = this.props;

    if (user) {
      const { displayName, photoURL } = user;
      return (
        <div className="c-top ">
          <Link className="c-btn__new" to={`/add`}>
          Add new
        </Link>
          <div />
          <div className="c-user__login">
            <p className="c-user__name">{displayName}</p>
            <img alt="user" className="c-user__image" src={photoURL} />
            <p className="c-btn" onClick={signOut}>
              Sign out
            </p>
          </div>
        </div>
      );
    }
    return (

      <div className="c-user__login c-top">
        <p className="c-btn" onClick={signInWithGoogle}>
          Sign in
        </p>
      </div>
    );
  }
}

export default withUser(Login);
