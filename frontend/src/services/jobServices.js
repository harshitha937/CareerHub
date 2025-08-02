import axios from 'axios';

const API = 'http://localhost:5000/jobs';

// Get JWT token from localStorage
const getAuthConfig = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true, // Include cookies if used in backend
  };
};

// ✅ Get all jobs (Public)
const getJobs = async () => {
  const res = await axios.get(API);
  return res.data;
};

// ✅ Get job by ID (Public)
const getJobById = async (id) => {
  const res = await axios.get(`${API}/${id}`);
  return res.data;
};

// ✅ Create a job (Private - Auth required)
const createJob = async (jobData) => {
  const res = await axios.post(API, jobData, getAuthConfig());
  return res.data;
};

// ✅ Delete a job (Private - only owner or admin)
const deleteJob = async (id) => {
  const res = await axios.delete(`${API}/${id}`, getAuthConfig());
  return res.data;
};

const jobServices = {
  getJobs,
  getJobById,
  createJob,
  deleteJob,
};

export default jobServices;
