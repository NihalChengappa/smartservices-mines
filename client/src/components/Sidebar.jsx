import React, { useEffect, useState } from 'react';
import '/src/styles/Sidebar.css';
import { Link } from 'react-router-dom';
const Sidebar = () => {
  const [role,setRole]=useState('')
  useEffect(()=>{
    setRole(localStorage.getItem('role'));
  },[])

  return (
    <div className="sidebar">
      <ul className="sidebar-list">
      {role === "Operator" ? (
    <>
      <li>
      <Link to="/checkposts">Checkposts</Link>
      </li>
      <li>
      <Link to="/employee">Employee</Link>
      </li>
      <li>
      <Link to="/routetracker">Route Tracker</Link>
      </li>
      <li>
      <Link to="/routes">Routes</Link>
      </li>
      <li>
      <Link to="/lessee">Lessee</Link>
      </li>
      <li>
      <Link to="/teams">Teams</Link>
      </li>
      <li>
      <Link to="/duty">Duty Tracker</Link>
      </li>
      <li>
      <Link to="/transportdetails">Transport Details</Link>
      </li>
      <li>
      <Link to="/SCCC">SCCC Awardee Details</Link>
      </li>
      <li>
      <Link to="/permitmaster">Permit Master</Link>
      </li>
      <li>
      <Link to="/eligibility">Eligibility</Link>
      </li>
      <li>
      <Link to="/quarry">Quarry</Link>
      </li>
    </>) : (
    <li>
      <Link to="/routetracker">Route Tracker</Link>
    </li>
      )}

        <li>About</li>
        <li>Contact</li>
      </ul>
    </div>
  );
};

export default Sidebar;