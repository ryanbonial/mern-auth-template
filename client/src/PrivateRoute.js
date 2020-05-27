import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { getAuthToken } from './authToken';

export default function PrivateRoute({ children, ...rest }) {
  const isAuthorized = () => getAuthToken();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthorized() ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}