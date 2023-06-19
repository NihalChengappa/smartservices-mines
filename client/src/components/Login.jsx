import React, { useState,useRef } from 'react';
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

  const handleLogin =  async(e) => {
    try {
      const url="http://localhost:8080/api/auth"
      const response=await axios.post(url,{user,pwd})
      setLogin(true)
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
        <h1>Success</h1>
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
      </section>
      )}
    </div>
  )
}

export default Login;
