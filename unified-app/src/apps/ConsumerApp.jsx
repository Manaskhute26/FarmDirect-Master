import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import contexts and i18n
import '../pages/consumer/i18n.js';
import { UserProvider } from '../pages/consumer/context/UserContext.jsx';
import { CartProvider } from '../pages/consumer/context/CartContext.jsx';

// Import Layout and Pages
import Layout from '../pages/consumer/components/Layout.jsx';
import HomePage from '../pages/consumer/HomePage.jsx';
import ProductsPage from '../pages/consumer/ProductsPage.jsx';
import CartPage from '../pages/consumer/CartPage.jsx';
// Add more pages here as needed...

const ConsumerApp = () => {
  return (
    <UserProvider>
      <CartProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="*" element={<Navigate to="/consumer" replace />} />
          </Route>
        </Routes>
      </CartProvider>
    </UserProvider>
  );
};

export default ConsumerApp;