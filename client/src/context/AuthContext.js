import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ token: null });

  const setAuthToken = ({ token }) => {
    setAuthState({ token });
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthState: token => setAuthToken(token) }}>
      {children}
    </AuthContext.Provider >
  )
};

export { AuthContext, AuthProvider };