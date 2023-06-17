import React from 'react';
import { Link } from 'react-router-dom';
import '/src/styles/Navbar.css'

const Navbar = () => {
  return (
    <nav className="divNavbar">
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to ="/login">Login</Link>
        </li>
        <li>
          <Link to ="/register">Signup</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
