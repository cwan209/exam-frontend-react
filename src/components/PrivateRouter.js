import { Route, Redirect} from "react-router-dom";
import React, {Component} from 'react';

export const PrivateRoute = ({ component: Component, ...rest }) => {

  const token = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={props =>
        token ? (
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
