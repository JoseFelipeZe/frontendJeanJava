import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Sale.css';

function Sale() {
  const [sales, setSales] = useState([]);
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ clientId: '', products: '' });
  const [editSaleId, setEditSaleId] = useState(null);

  useEffect(() => {
    fetchSales();
    fetchClients();
    fetchProducts();
  }, []);

  const fetchSales = async () => {
    const response = await axios.get('http://localhost:8080/Sale');
    setSales(response.data);
  };

  const fetchClients = async () => {
    const response = await axios.get('http://localhost:8080/Client');
    setClients(response.data);
  };

  const fetchProducts = async () => {
    const response = await axios.get('http://localhost:8080/Product');
    setProducts(response.data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editSaleId) {
      await axios.put(`http://localhost:8080/Sale/${editSaleId}`, formData);
    } else {
      await axios.post('http://localhost:8080/Sale', formData);
    }
    setFormData({ clientId: '', products: '' });
    setEditSaleId(null);
    fetchSales();
  };

  const handleEdit = (sale) => {
    setFormData({ clientId: sale.client.id, products: sale.products });
    setEditSaleId(sale.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/Sale/${id}`);
    fetchSales();
  };

  return (
    <div className="sale-container">
      <h1 className="title">Vendas</h1>
      <form onSubmit={handleSubmit} className="sale-form">
        <select name="clientId" value={formData.clientId} onChange={handleChange} className="form-input">
          <option value="">Selecione o Cliente</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="products"
          placeholder="Produtos"
          value={formData.products}
          onChange={handleChange}
          className="form-input"
        />
        <button type="submit" className="submit-button">{editSaleId ? 'Atualizar' : 'Adicionar'}</button>
      </form>
      <ul className="sale-list">
        {sales.map((sale) => (
          <li key={sale.id} className="sale-item">
            {sale.client.name} - {sale.products}
            <button onClick={() => handleEdit(sale)} className="edit-button">Editar</button>
            <button onClick={() => handleDelete(sale.id)} className="delete-button">Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sale;
