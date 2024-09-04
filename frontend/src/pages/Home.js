import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file

const Home = () => {
  return (
    <div className="home-container">
      <div className="content">
        <h1 className="animated-heading">🎵 Welcome to the Music Player 🎵</h1>
        <p className="subheading">Discover the ultimate music experience:</p>
        <ul className="features-list">
          <li>
            <i className="fas fa-music"></i> Create and manage playlists
          </li>
          <li>
            <i className="fas fa-search"></i> Search for your favorite songs
          </li>
          <li>
            <i className="fas fa-play-circle"></i> Play, pause, skip, and control volume
          </li>
        </ul>
        <div className="home-links">
          <Link to="/register" className="cta-button">Get Started</Link>
          <Link to="/login" className="cta-button secondary">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
