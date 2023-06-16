import React, { useState, useEffect } from 'react';
import '/src/styles/LogoLoad.css';
import sslogol from '/src/assets/sslogo.png';

const LogoLoad = ({ onLoadingComplete }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      onLoadingComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div className="loading-screen">
      {loading ? (
        <div className="loading-content">
          <img src={sslogol} className="sslogol" alt="ssLogol" />
          <div className="spinner"></div>
          <h3>Loading</h3>
        </div>
      ) : null}
    </div>
  );
};

export default LogoLoad;
