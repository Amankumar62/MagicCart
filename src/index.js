import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { ProductProvider } from "./Context/ProductContext";
import { AuthProvider } from "./Context/AuthContext";
import { makeServer } from "./services/server";
import { CartProvider } from "./Context/CartContext";

// Call make Server
makeServer();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <ProductProvider>
        <AuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </ProductProvider>
    </Router>
  </React.StrictMode>
);
