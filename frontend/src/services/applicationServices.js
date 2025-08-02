// src/services/applicationServices.js
import axios from 'axios';

const API = 'http://localhost:5000/applications';

const getMyApplications = async () => {
  const res = await axios.get(`${API}/my-applications`, { withCredentials: true });
  return res.data;
};

export default {
  getMyApplications,
};
