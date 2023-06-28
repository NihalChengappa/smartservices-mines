import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import '/src/styles/Navbar.css';

const Navbar = () => {
  const tok = localStorage.getItem('token');
  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    
    if (confirmLogout) {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('expirationTime');
      return <Navigate to="/login" />;
    }
  };

  return (
    <nav className="divNavbar">
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        {tok ? (
          <>
            <li>
              <Link to="/reports">Reports</Link>
              <Link to="/forms">Forms</Link>
            </li>
            <li>
              <Link to="/login" onClick={handleLogout}>Logout</Link>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link>
            <Link to="/register">Signup</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
