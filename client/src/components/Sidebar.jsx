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
        <li className={location.pathname === '/routetracker' ? 'active' : ''}>
          <Link to="/routetracker" className="sidebar-link">ROUTE TRACKER</Link>
        </li>
        <li className={location.pathname === '/checkposts' ? 'active' : ''}>
          <Link to="/checkposts" className="sidebar-link">CHECKPOSTS</Link>
        </li>
        <li className={location.pathname === '/employee' ? 'active' : ''}>
          <Link to="/employee" className="sidebar-link">EMPLOYEE</Link>
        </li>
        <li className={location.pathname === '/routes' ? 'active' : ''}>
          <Link to="/routes" className="sidebar-link">ROUTES</Link>
        </li>
        <li className={location.pathname === '/lessee' ? 'active' : ''}>
          <Link to="/lessee" className="sidebar-link">LESSEE</Link>
        </li>
        <li className={location.pathname === '/teams' ? 'active' : ''}>
          <Link to="/teams" className="sidebar-link">TEAMS</Link>
        </li>
        <li className={location.pathname === '/duty' ? 'active' : ''}>
          <Link to="/duty" className="sidebar-link">DUTY TRACKER</Link>
        </li>
        <li className={location.pathname === '/transportdetails' ? 'active' : ''}>
          <Link to="/transportdetails" className="sidebar-link">TRANSPORT DETAILS</Link>
        </li>
        <li className={location.pathname === '/SCCC' ? 'active' : ''}>
          <Link to="/SCCC" className="sidebar-link">SCCC AWARDEE DETAILS</Link>
        </li>
        <li className={location.pathname === '/permitmaster' ? 'active' : ''}>
          <Link to="/permitmaster" className="sidebar-link">PERMIT MASTER</Link>
        </li>
        <li className={location.pathname === '/eligibility' ? 'active' : ''}>
          <Link to="/eligibility" className="sidebar-link">ELIGIBILITY</Link>
        </li>
        <li className={location.pathname === '/quarry' ? 'active' : ''}>
          <Link to="/quarry" className="sidebar-link">QUARRY</Link>
        </li>
        </>) : (
        <li className={location.pathname === '/routetracker' ? 'active' : ''}>
        <Link to="/routetracker" className="sidebar-link">ROUTE TRACKER</Link>
        </li>
          )}
      </ul>
    </div>
  );
};

export default Sidebar;