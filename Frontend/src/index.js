import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";

// ✅ Import FavoriteManager and CartProvider
import FavoriteManager from './Components/FavoriteManager';
import { CartProvider } from './Components/CartContext'; // ✅ Make sure this exists

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FavoriteManager>
      <CartProvider>
        <App />
      </CartProvider>
    </FavoriteManager>
  </React.StrictMode>
);

// Optional performance monitoring
reportWebVitals();
