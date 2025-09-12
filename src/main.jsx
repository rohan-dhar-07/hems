import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css'; // Your global stylesheet

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* By wrapping App here, all Links and Routes inside it will work */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);