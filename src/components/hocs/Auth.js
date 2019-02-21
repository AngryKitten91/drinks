import React, { Component, createContext } from "react";

import {auth} from '../../firebase.js'

export const UserContext = createContext({ user: null });

const Auth = WrappedComponent => {

  class Auth extends Component {
    
    state = {
      user: null,
      isLoading: true
    };

    componentDidMount = () => {
      this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
        if (user) {
          const { photoURL, displayName, uid } = user;
          this.setState({
            user: { photoURL, displayName, uid },
            isLoading: false
          });
        } else {
          this.setState({
            user: null,
            isLoading: false
          });
        }
      });
    };

    componentWillUnmount = () => {
      this.unsubscribeFromAuth();
    };

    
    render() {
      const { user, isLoading } = this.state;
      if (isLoading) return null;

      return (
        <UserContext.Provider
          value={{ user }}
        >
          <WrappedComponent {...this.props} />
        </UserContext.Provider>
      );
    }
  }

  return Auth;
};

export default Auth;