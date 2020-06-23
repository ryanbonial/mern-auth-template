import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './AppHeader.css';
import logo from './logo.svg'
import { AuthContext } from './context/AuthContext';

export default function AppHeader() {
  const authContext = useContext(AuthContext);
  const [token, setToken] = useState('');

  useEffect(() => {
    if (authContext.authState.token === null) {
      fetch('http://localhost:4000/refresh-login', { credentials: 'include' })
        .then(resp => resp.json())
        .then(refreshResp => {
          authContext.setAuthState({ token: refreshResp.token });
          setToken(refreshResp.token);
        }).catch(err => {
          authContext.setAuthState({ token: '' });
          console.log(err);
          if (window.location.pathname !== '/login' && window.location.pathname !== '/register')
            window.location.href = '/login';
        });
    } else {
      setToken(authContext.authState.token);
    }
  }, [authContext, token]);

  const getNavLinks = () => {
    if (token) {
      return (<li><Link to="/private">Private</Link></li>);
    }
    return (
      <>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Log In</Link></li>
      </>
    );
  }

  return (
    <header>
      <Link to="/">
        <span className="logo">
          <img src={logo} alt="My App Logo" height="30px"></img>
          <span>APP NAME</span>
        </span>
      </Link>
      <nav>
        <ul>
          {getNavLinks()}
        </ul>
      </nav>
    </header>
  );
}