import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1 className="title">Sistema de Estoque</h1>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item"><Link to="/clients" className="nav-link">Clientes</Link></li>
          <li className="nav-item"><Link to="/products" className="nav-link">Produtos</Link></li>
          <li className="nav-item"><Link to="/sales" className="nav-link">Vendas</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
