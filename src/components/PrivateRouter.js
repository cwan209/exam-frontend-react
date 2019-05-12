import { Route, Redirect} from "react-router-dom";
import React, {Component} from 'react';

export const PrivateRoute = ({ component: Component, ...rest }) => {

  const loggedIn = localStorage.getItem("token") !== 'undefined';
  return (
    <Route
      {...rest}
      render={props =>
        loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};
