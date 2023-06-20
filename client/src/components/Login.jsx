import React, { useState,useRef,useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from "axios"
import { Link } from 'react-router-dom';
import '/src/styles/Login.css';

const Login = () => {
  const [user, setEmail] = useState('');
  const [pwd, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successlogin,setLogin]=useState(false)
  const errlog=useRef()
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
      // const expirationTimestamp = parseInt(expirationTime);
      console.log(currentTime,expirationTime)
      if (currentTime < expirationTime) {
        setLogin(true);
      } else {
        setLogin(false);
        // Token has expired, clear localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
      }
    } else {
      setLogin(false);
    }
  }, []);
  

  const handleLogin =  async(e) => {
    try {
      const url="http://localhost:8080/api/auth"
      const response=await axios.post(url,{user,pwd})
      setLogin(true)
      localStorage.setItem("token", response.data.data);
      localStorage.setItem("expirationTime", response.data.timeleft);
      console.log(response.data)
    } catch (error) {
      if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError("Invalid Username or Password!");
        console.log(error.response.status)
        errlog.current.focus()
			}
      
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      handleLogin(e);   
  };

  return (
    <div className="login-container">
      {successlogin ? (
      <section>
        <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      </section>
      )
      :
      (<section>
        <p ref={errlog} className={error?"errmssg":"offscreen"}aria-live="assertive">{error}</p>
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
        </p>
            <div className='pb' >
              <button type="button">
                <Link to="/register">Signup</Link>
              </button>
            </div>
        <div className='bthl'>
          <Link to="/">Back to Home</Link>
        </div>
      </section>
      )}
    </div>
  )
}

export default Login;
