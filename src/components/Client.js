// src/components/Client.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div>
      <h1>Clients</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <button type="submit">{editClientId ? 'Update' : 'Add'}</button>
      </form>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            {client.name} - {client.phone}
            <button onClick={() => handleEdit(client)}>Edit</button>
            <button onClick={() => handleDelete(client.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Client;
