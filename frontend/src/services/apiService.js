// src/services/apiService.js
import axios from 'axios';
import API_BASE_URL from '../config';

const getToken = () => localStorage.getItem('token');

const getPlaylists = async () => {
  const res = await axios.get(`${API_BASE_URL}/playlists`, {
    headers: { 'x-auth-token': getToken() },
  });
  return res.data;
};

const createPlaylist = async (name) => {
  const res = await axios.post(`${API_BASE_URL}/playlists`, { name }, {
    headers: { 'x-auth-token': getToken() },
  });
  return res.data;
};

const addSongToPlaylist = async (playlistId, song) => {
  const res = await axios.put(`${API_BASE_URL}/playlists/${playlistId}`, { song }, {
    headers: { 'x-auth-token': getToken() },
  });
  return res.data;
};

const apiService = {
  getPlaylists,
  createPlaylist,
  addSongToPlaylist,
};

export default apiService;
