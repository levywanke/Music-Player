// src/components/Playlist.js
import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';

const Playlist = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const data = await apiService.getPlaylists();
        setPlaylists(data);
      } catch (err) {
        console.error('Failed to fetch playlists:', err.message);
      }
    };
    fetchPlaylists();
  }, []);

  return (
    <div className="playlist-container">
      <h1>Your Playlists</h1>
      <ul>
        {playlists.map((playlist) => (
          <li key={playlist._id}>{playlist.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
