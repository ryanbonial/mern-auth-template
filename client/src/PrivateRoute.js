import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from './context/AuthContext';

export default function PrivateRoute({ children, ...rest }) {
  const authContext = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authContext.authState.token ? (
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