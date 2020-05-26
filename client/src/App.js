import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

import './App.css';
import Routes from './Routes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <Link to="/"><h1>My App</h1></Link>
          <div><Link to="/register">Register</Link></div>
          <div><Link to="/login">Log In</Link></div>
        </header>

        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
