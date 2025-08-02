// src/services/contactService.js

import axios from 'axios';

const API = 'http://localhost:5000/contact';

export const sendContactMessage = async (formData) => {
  const response = await axios.post(API, formData);
  return response.data;
};
export const getAllContacts = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${API}/admin`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
