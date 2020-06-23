import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import PageContent from '../PageContent';

export default function RegisterUser() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const onRegisterSubmit = async e => {
    e.preventDefault();
    await fetch('http://localhost:4000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: userName, password }),
    });
    history.push('/login');
  };

  return (
    <PageContent className="register">
      <h2>Register</h2>
      <form onSubmit={onRegisterSubmit}>
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
        <button type="submit">Register</button>
      </form>
    </PageContent>
  );
}