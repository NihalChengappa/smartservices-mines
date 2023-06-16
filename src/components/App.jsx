import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { useState } from 'react';
import Navbar from '/src/components/Navbar';
import Home from '/src/components/Home';
import About from '/src/components/About';
import LogoLoad from '/src/components/LogoLoad';
import Login from '/src/components/Login';
import Register from './Register';
import sslogoapp from '/src/assets/sslogo.png';

import '/src/styles/App.css'

const App = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);

  const handleLoadingComplete = () => {
    setLoadingComplete(true);
  };

  return (
    <Router>
      {!loadingComplete ? (
        <LogoLoad onLoadingComplete={handleLoadingComplete} />
      ) : (
      <>
      <header>
        <img src={sslogoapp} className="sslogoapp" alt="ssogoapp" />
      </header>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/home" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/Register/" element={<Register/>} />
      </Routes>
      </>
        )}
    </Router>
  );
}

export default App;
