import React, { useState } from 'react';
import axios from "axios"
import { Link } from 'react-router-dom';
import '/src/styles/Login.css';

const Login = () => {
  const [user, setEmail] = useState('');
  const [pwd, setPassword] = useState('');
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin =  async(e) => {
    try {
      const url="http://localhost:8080/api/auth"
      const response=await axios.post(url,{user,pwd})
      console.log(response.data)
      window.location.href = '/home';
    } catch (error) {
      if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.message);
			}
      
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      handleLogin(e);   
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
      <p className='p1l'>
        Don't have an account?
          <p>
          </p>
      </p>
          <div className='pb' >
            <button type="button">
              <Link to="/register">Signup</Link>
            </button>
          </div>
      <div className='bthl'>
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
};

export default Login;
