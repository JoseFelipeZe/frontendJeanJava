import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Product.css';

function Product() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ description: '', cost: 0, value: 0 });
  const [editProductId, setEditProductId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get('http://localhost:8080/Products');
    setProducts(response.data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editProductId) {
      await axios.put(`http://localhost:8080/Products/${editProductId}`, formData);
    } else {
      await axios.post('http://localhost:8080/Products', formData);
    }
    setFormData({ description: '', cost: 0, value: 0 });
    setEditProductId(null);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setFormData({ description: product.description, cost: product.cost, value: product.value });
    setEditProductId(product.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/Products/${id}`);
    fetchProducts();
  };

  return (
    <div className="product-container">
      <h1 className="title">Produtos</h1>
      <form onSubmit={handleSubmit} className="product-form">
        <input
          type="text"
          name="description"
          placeholder="Nome do Produto"
          value={formData.description}
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="number"
          name="cost"
          placeholder="Custo"
          value={formData.cost}
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="number"
          name="value"
          placeholder="Quantidade"
          value={formData.value}
          onChange={handleChange}
          className="form-input"
        />
        <button type="submit" className="submit-button">{editProductId ? 'Atualizar' : 'Adicionar'}</button>
      </form>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id} className="product-item">
            {product.description} - {product.cost} - {product.value}
            <button onClick={() => handleEdit(product)} className="edit-button">Editar</button>
            <button onClick={() => handleDelete(product.id)} className="delete-button">Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Product;
