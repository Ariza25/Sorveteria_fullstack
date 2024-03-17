import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AuthProvider from "./context/AuthContext.tsx";
import {ProductProvider} from "./context/ProductContext.tsx";
import {CartProvider} from "./context/CartContext.tsx";
import {UserDataProvider} from "./context/DataUserContext.tsx";
import { OrderProvider } from "./context/OrderContext.tsx";
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <UserDataProvider>
            <OrderProvider>
            <App />
            </OrderProvider>
          </UserDataProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  </React.StrictMode>
);
