import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import '/src/styles/Login.css';

const Login = ({ setIsAuthenticated }) => {
  const [user, setEmail] = useState('');
  const [pwd, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successlogin, setLogin] = useState(false);
  const errlog = useRef();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const expirationTime = localStorage.getItem('expirationTime');

    if (token && expirationTime) {
      const currentTime = Date.now();
      console.log(currentTime,expirationTime)
      if (currentTime < expirationTime) {
        setLogin(true);
        setIsAuthenticated(true); 
      } else {
        setLogin(false);
        setIsAuthenticated(false); 
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        localStorage.removeItem('email');
        localStorage.removeItem('role');
      }
    } else {
      setLogin(false);
      setIsAuthenticated(false);
    }
  }, [setIsAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:8080/api/auth';
      const response = await axios.post(url, { user, pwd });
      localStorage.setItem('token', response.data.data);
      localStorage.setItem('email',response.data.email);
      localStorage.setItem('expirationTime', response.data.timeleft);
      await fetchRole();
      setIsAuthenticated(true);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError('Invalid Username or Password!');
        errlog.current.focus();
      }
    }
  };
  
  const fetchRole = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/employee');
      localStorage.setItem('role',res.data.filter((item) => item.emailID === user)[0].role)
      setLogin(true); 
    } catch (error) {
      setError('Employee has to be registered!');
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('expirationTime');
      errlog.current.focus();
      <Navigate to="/login" /> 
    }
  };
  if (successlogin) {
    return (
      <Navigate to="/home" /> 
    );
  }

  return (
    <div className="login-container">
      <section>
        <p
          ref={errlog}
          className={error ? 'errmssg' : 'offscreen'}
          aria-live="assertive"
        >
          {error}
        </p>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>&nbsp;&nbsp;&nbsp;Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input type="email" value={user} onChange={handleEmailChange} />
          </div>
          <div className="form-group">
            <label>Password:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input type="password" value={pwd} onChange={handlePasswordChange} />
          </div>
          <button type="submit">Login</button>
        </form>
        <p className="p1l">Don't have an account?</p>
        <div className="pb">
          <button type="button">
            <Link to="/register">Signup</Link>
          </button>
        </div>
        <div className="bthl">
          <Link to="/">Back to Home</Link>
        </div>
      </section>
    </div>
  );
};

export default Login;
