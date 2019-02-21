import React, { Component } from "react";

import { UserContext } from "./Auth";

const withUser = WrappedComponent => {
  class WithUser extends Component {
    render() {

      return (
        <UserContext.Consumer>
          {({ user }) => {
            return (<WrappedComponent user={user} {...this.props} />)
          }}
        </UserContext.Consumer>
      );
    }
  }

  return WithUser;
};

export default withUser;
