import axios from 'axios';
import getUserDetails from '../utils/getUserDetails';

const API = 'http://localhost:5000';

// AUTHENTICATED HEADERS
const getHeaders = (isForm = false) => {
  const { token } = getUserDetails();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // Only set content-type manually if NOT sending FormData
  if (!isForm) {
    headers['Content-Type'] = 'application/json';
  }

  return {
    headers,
    withCredentials: true,
  };
};

// ====================== USER ROUTES ======================
export const getAllUsers = () => axios.get(`${API}/auth`, getHeaders());
export const deleteUser = (id) => axios.delete(`${API}/auth/${id}`, getHeaders());

// ====================== JOB ROUTES ======================
export const getJobs = () => axios.get(`${API}/jobs`);
export const deleteJob = (id) => axios.delete(`${API}/jobs/${id}`, getHeaders());
export const createJob = (jobFormData) => axios.post(`${API}/jobs`, jobFormData, getHeaders(true));
