// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <ul>
          <li><Link to="/clients">Clients</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/sales">Sales</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
