import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Client.css';

function Client() {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({ name: '', phone: '' });
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
    if (editClientId) {
      await axios.put(`http://localhost:8080/Client/${editClientId}`, formData);
    } else {
      await axios.post('http://localhost:8080/Client', formData);
    }
    setFormData({ name: '', phone: '' });
    setEditClientId(null);
    fetchClients();
  };

  const handleEdit = (client) => {
    setFormData({ name: client.name, phone: client.phone });
    setEditClientId(client.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/Client/${id}`);
    fetchClients();
  };

  return (
    <div className="client-container">
      <h1 className="title">Clients</h1>
      <form onSubmit={handleSubmit} className="client-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="form-input"
        />
        <button type="submit" className="submit-button">
          {editClientId ? 'Update' : 'Add'}
        </button>
      </form>
      <ul className="client-list">
        {clients.map((client) => (
          <li key={client.id} className="client-item">
            {client.name} - {client.phone}
            <button onClick={() => handleEdit(client)} className="edit-button">Edit</button>
            <button onClick={() => handleDelete(client.id)} className="delete-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Client;
