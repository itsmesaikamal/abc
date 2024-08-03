// Nav.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { store } from './App';
import './Nav.css';

const Nav = () => {
  const [token, setToken] = useContext(store);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return token ? (
    <div className="sidebar">
      <a className="navbar-brand" href="#">Event Manager</a>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/create-event">Create Event</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/view-events">View Events</Link>
        </li>
        <li className="nav-item">
          <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>
  ) : (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/register">Register</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
