// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Client from './components/Client';
import Product from './components/Product';
import Sale from './components/Sale';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clients" element={<Client />} />
        <Route path="/products" element={<Product />} />
        <Route path="/sales" element={<Sale />} />
      </Routes>
    </Router>
  );
}

export default App;
