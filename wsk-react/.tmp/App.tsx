import React from 'react';
import logo from './logo.svg';
import './App.scss';
// import { MyComponent } from 'react-library';
import { MyComponent, defineCustomElements } from 'react-library';
defineCustomElements();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MyComponent first="Web" middle="Starter" last="Kit" />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
