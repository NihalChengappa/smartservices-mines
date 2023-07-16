import React, { useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '/src/components/Navbar';
import Home from '/src/components/Home';
import About from '/src/components/About';
import LogoLoad from '/src/components/LogoLoad';
import Login from '/src/components/Login';
import Register from '/src/components/Register';
import Checkposts from '/src/components/Checkposts';
import TransportDetails from '/src/components/TransportDetails';
import Eligibility from '/src/components/Eligibility';
import Quarry from '/src/components/Quarry';
import Routess from './Routess';
import Employee from './Employee';
import '/src/styles/App.css'
import Teams from './Teams';
import DutyTracker from './DutyTracker';
import RouteTracker from './RouteTracker';
import SCCC from './SCCC';
import Lessee from '/src/components/Lessee';
import PermitMaster from './PermitMaster';
import Reports from './Reports';
import Sidebar from './Sidebar';
import Alert from './Alert';

const App = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const handleLoadingComplete = () => {
    setLoadingComplete(true);
    
  };
  return (
    <Router>
  {!loadingComplete ? (
    <LogoLoad onLoadingComplete={handleLoadingComplete} />
  ) : (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
        <Route exact path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />}/>
        <Route path="/register" element={<Register />} />
        {isAuthenticated ? (
              <>
                {localStorage.getItem('role') === 'Operator' ? (
                  <>
                    <Route path="/checkposts" element={<Checkposts />} />
                    <Route path="/employee" element={<Employee />} />
                    <Route path="/transportdetails" element={<TransportDetails />} />
                    <Route path="/eligibility" element={<Eligibility />} />
                    <Route path="/quarry" element={<Quarry />} />
                    <Route path="/routes" element={<Routess />} />
                    <Route path="/teams" element={<Teams />} />
                    <Route path="/duty" element={<DutyTracker />} />
                    <Route path="/SCCC" element={<SCCC />} />
                    <Route path="/lessee" element={<Lessee />} />
                    <Route path="/routetracker" element={<RouteTracker />} />
                    <Route path="/permitmaster" element={<PermitMaster />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/forms" element={<Sidebar />} />
                    <Route path="/alerts" element={<Alert />} />
                  </>
                ) : (
                  <>
                    <Route path="/forms" element={<Sidebar />} />
                    <Route path="/routetracker" element={<RouteTracker />} />
                  </>
                )}
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" />} />
            )}
          </Routes>
    </>
  )}
</Router>

  );
};

export default App;