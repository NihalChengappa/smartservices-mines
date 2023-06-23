import React, { useState } from 'react';
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
import sslogoapp from '/src/assets/sslogo.png';

import '/src/styles/App.css'

const App = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
          <img src={sslogoapp} className="sslogoapp" alt="ssogoapp" />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route path="/register" element={<Register />} />
            {isAuthenticated ? (
              <>
              <Route path="/checkposts" element={<Checkposts />} />
              <Route path="/transportdetails" element={<TransportDetails />} />
              <Route path="/eligibility" element={<Eligibility />} />
              <Route path="/quarry" element={<Quarry />} />
              </>
            ) : (<Route
              path="/checkposts"
              element={<Navigate to="/login" />}
            />)}
          </Routes>
        </>
      )}
    </Router>
  );
};

export default App;
