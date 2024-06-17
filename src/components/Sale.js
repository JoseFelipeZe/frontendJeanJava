// src/components/Sale.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';


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
    <div>
      <h1>Sales</h1>
      <form onSubmit={handleSubmit}>
        <select name="clientId" value={formData.clientId} onChange={handleChange}>
          <option value="">Select Client</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="products"
          placeholder="Products"
          value={formData.products}
          onChange={handleChange}
        />
        <button type="submit">{editSaleId ? 'Update' : 'Add'}</button>
      </form>
      <ul>
        {sales.map((sale) => (
          <li key={sale.id}>
            {sale.client.name} - {sale.products}
            <button onClick={() => handleEdit(sale)}>Edit</button>
            <button onClick={() => handleDelete(sale.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sale;
