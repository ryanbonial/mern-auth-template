import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import Routes from './Routes';
import AppHeader from './AppHeader';
import { setAuthToken } from './authToken';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/refresh-login', { credentials: 'include' })
      .then(resp => resp.json())
      .then(refreshResp => {
        setAuthToken(refreshResp.token);
        setLoading(false);
      }).catch(err => {
        console.log(err);
        if (window.location.pathname !== '/login' && window.location.pathname !== '/register')
        window.location.href = '/login';
        setLoading(false);
      }) ;
  }, []);

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="App">
      <BrowserRouter>
        <AppHeader/>

        <main>
          <Routes />
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
