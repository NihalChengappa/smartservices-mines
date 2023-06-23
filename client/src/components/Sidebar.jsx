import React from 'react';
import '/src/styles/Sidebar.css';
import { Link } from 'react-router-dom';
const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-list">
      <li>
          <Link to ="/checkposts">Checkposts</Link>
      </li>
      <li>
        <Link to ="/transportdetails">Transport Details</Link>
      </li>
      <li>
        <Link to ="/eligibility">Eligibility</Link>
      </li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </div>
  );
};

export default Sidebar;