import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '/src/styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleButtonClick = () => {
    window.location.href = '/register';
  };

  const handleLogin = () => {
    // Handle login logic here
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      handleLogin();   
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>&nbsp;&nbsp;&nbsp;Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div className="form-group">
          <label>Password:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Login</button>
      </form>
      <p className='p1l'>
        Don't have an account?
          <p>
          </p>
        <button type="button" onClick={handleButtonClick}>
          Sign Up
        </button>
      </p>
      <p className='p2l'>
        <Link to="/">Back to Home</Link>
      </p>
    </div>
  );
};

export default Login;
