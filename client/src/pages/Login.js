import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import PageContent from '../PageContent';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const authContext = useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const history = useHistory();

  const onLoginSubmit = async e => {
    e.preventDefault();
    setErrorMsg('');
    const loginResp = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name: userName, password }),
    });
    if (loginResp.ok) {
      const login = await loginResp.json();
      authContext.setAuthState({token: login.token});

      history.push('/private');
    } else {
      setErrorMsg('Invalid username or password')
    }
  };

  return (
    <PageContent className="login">
      <h2>Log In</h2>
      {errorMsg && <div className="error-message">{errorMsg}</div>}
      <form onSubmit={onLoginSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </PageContent>
  );
}