import axios from "axios";
axios.defaults.withCredentials = true;

const API = axios.create({ baseURL: "http://localhost:5000" });

export const register = (data) => API.post("/auth", data);
export const login = (data) => API.post("/auth/login", data);
export const logout = () => API.post("/auth/logout");
export const getProfile = () => API.get("/auth/profile");
export const forgotPassword = (data) => API.post("/auth/forgotpassword", data);
export const resetPassword = ({ email, newPassword, token }) =>
  API.post(`/auth/reset-password/${token}`, { email, newPassword });

export const verifyEmail = (token) =>
  API.get(`/auth/verifyEmail?token=${token}`);
