import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Sale.css';

function Sale() {
  const [sales, setSales] = useState([]);
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ ClientName: '', product: '', quantidade:''});
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
    console.log(products.data)
    setProducts(response.data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
   
    await axios.post('http://localhost:8080/Sale', formData);
    
    setFormData({ClientName: '', product: '', quantidade: ''});
    setEditSaleId(null);
    fetchSales();
  };

  const handleEdit = (sale) => {
    setFormData({ clientId: sale.client.id, products: sale.products });
    setEditSaleId(sale.id);
  };

  const handleDelete = async (sale) => {
    console.log(sale)
    await axios.delete(`http://localhost:8080/Sale/delete`, sale );
    fetchSales();
  };

  return (
    <div className="sale-container">
      <h1 className="title">Vendas</h1>
      <form onSubmit={handleSubmit} className="sale-form">
        <select name="ClientName" value={formData.ClientName} onChange={handleChange} className="form-input">
          <option value="">Selecione o Cliente</option>
          {clients.map((client) => (
            <option key={client.id} value={client.ClientName}>
              {client.name}
            </option>
          ))}
        </select>
        <select name="product" value={formData.product} onChange={handleChange} className="form-input">
          <option value="">Selecione o produto</option>
          {products.map((product) => (
            <option key={product.description} value={product.description}>
              {product.description}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="quantidade"
          placeholder="Produtos"
          value={formData.quantidade}
          onChange={handleChange}
          className="form-input"
        />
        <button type="submit" className="submit-button">{editSaleId ? 'Atualizar' : 'Adicionar'}</button>
      </form>
      <ul className="sale-list">
        {sales.map((sale) => (
          <li key={sale.id} className="sale-item">
            {sale.product} - {sale.quantidade}

          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sale;
