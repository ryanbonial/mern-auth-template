import React from 'react';
import { Link } from 'react-router-dom';

import './AppHeader.css';
import logo from './logo.svg'

export default function AppHeader() {
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
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Log In</Link></li>
        </ul>
      </nav>
    </header>
  );
}