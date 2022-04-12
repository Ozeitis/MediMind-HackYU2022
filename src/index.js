import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Navbar from './AppShell/Navbar';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AppShell from './AppShell/AppShell';


ReactDOM.render(
  <React.StrictMode>
    <AppShell />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
