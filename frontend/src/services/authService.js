// src/services/authService.js
import axios from 'axios';
import API_BASE_URL from '../config';

const register = async (userData) => {
  const res = await axios.post(`${API_BASE_URL}/auth/register`, userData);
  return res.data;
};

const login = async (userData) => {
  const res = await axios.post(`${API_BASE_URL}/auth/login`, userData);
  if (res.data.token) {
    localStorage.setItem('token', res.data.token);
  }
  return res.data;
};

const logout = () => {
  localStorage.removeItem('token');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
