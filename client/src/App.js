import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import Routes from './Routes';
import AppHeader from './AppHeader';

import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <AppHeader />
          <main>
            <Routes />
          </main>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
