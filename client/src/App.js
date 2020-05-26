import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import Routes from './Routes';
import AppHeader from './AppHeader';

function App() {
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
