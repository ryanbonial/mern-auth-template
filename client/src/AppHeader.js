import React from 'react';
import { Link } from 'react-router-dom';

import './AppHeader.css';
import logo from './logo.svg'
import { getAuthToken } from './authToken';

export default function AppHeader() {
  const token = getAuthToken(); // TODO: this isn't right, it isn't dynamic

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