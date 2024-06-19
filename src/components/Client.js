import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Client.css';

function Client() {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({ name: '', phone: '' , id:''});
  const [editClientId, setEditClientId] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const response = await axios.get('http://localhost:8080/Client');
    setClients(response.data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:8080/Client`, formData);
    

    setFormData({ name: '', phone: '' });
    setEditClientId(null);
    fetchClients();
  };

  const handleEdit = (client) => {
    setFormData({ name: client.name, phone: client.phone, id:client.id });
    setEditClientId(client.id);
  };

  const handleDelete = async (client) => {
    console.log(client)
    await axios.post(`http://localhost:8080/Client/delete`, client);
    fetchClients();
  };

  return (
    <div className="client-container">
      <h1 className="title">Clientes</h1>
      <form onSubmit={handleSubmit} className="client-form">
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={formData.name}
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="text"
          name="phone"
          placeholder="Telefone"
          value={formData.phone}
          onChange={handleChange}
          className="form-input"
        />
        <button type="submit" className="submit-button">
          {editClientId ? 'Atualizar' : 'Adicionar'}
        </button>
      </form>
      <ul className="client-list">
        {clients.map((client) => (
          <li key={client.id} className="client-item">
            {client.name} - {client.phone}
            <button onClick={() => handleEdit(client)} className="edit-button">Editar</button>
            <button onClick={() => handleDelete(client)} className="delete-button">Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Client;
