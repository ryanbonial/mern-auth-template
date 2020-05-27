import React, { useState } from 'react';

import PageContent from '../PageContent';

export default function Login({ history }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const onLoginSubmit = async e => {
    e.preventDefault();
    setErrorMsg('');
    const regResp = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name: userName, password }),
    });
    console.log(regResp);
    if (regResp.ok) {
      history.push('/');
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