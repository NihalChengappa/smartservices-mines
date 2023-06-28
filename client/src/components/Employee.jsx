import React, { useState,useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';

const Employee = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('');
  const [checkpostName, setCheckpostName] = useState('');
  const [routeName, setRouteName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [checkposts, setCheckposts] = useState([]);
  const [emailID, setEmailID] = useState('');
  const [routes, setRoutes] = useState([]);

  const handleEmployeeIdChange = (event) => {
    setEmployeeId(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmailID(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleCheckpostNameChange = (event) => {
    setCheckpostName(event.target.value);
  };

  const handleRouteNameChange = (event) => {
    setRouteName(event.target.value);
  };

  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value);
  };

  useEffect(() => {
    getCheckposts();
    // console.log(checkposts);
  }, []);
  useEffect(() => {
    getRoutes();
    // console.log(routes);
  }, []);

  const getCheckposts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/checkposts');
      const checkpostNames = response.data.map((checkpost) => checkpost.name);
      const options = checkpostNames.map((checkpost) => ({
        value: checkpost,
        label: checkpost,
      }));
      setCheckposts(options);
    //   console.log(options)
    } catch (error) {
      console.error('Error fetching checkposts:', error);
    }
  };

  const getRoutes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/routes');
      const options = response.data.map((route) => ({
        value: route,
        label: route,
      }));
      setRoutes(options);
    //   console.log(options)
    } catch (error) {
      console.error('Error fetching Routes:', error);
    }
  };
  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
        const url="http://localhost:8080/api/employee"
        const response = await axios.post(url,{employeeId,
          emailID,
            name,
            phoneNumber,
            role,
            checkpostName,
            routeName,
            companyName});
  
        // Make an HTTP POST request to store the data in MongoDB
        console.log('Data stored in MongoDB:', response.data);
      } catch (error) {
        if(error.response?.status===400)
        {
            console.log("A checkpoint with the same Employee ID already exists.")
        }
        else{
            console.log('Error storing data in MongoDB:', error)
        }
      }
    // Perform any necessary validation and submit the form data
    // to the server or perform further actions.

    // Reset the form fields
    setEmployeeId('');
    setName('');
    setPhoneNumber('');
    setRole('');
    setCheckpostName('');
    setEmailID('');
    setRouteName('');
    setCompanyName('');
  };
//   const data= "";
  const isCheckpostOp = role === 'Checkpost op';
  const isMobileSquad = role === 'Mobile Squad';

  return (
    <div>
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <h1>Employee Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Employee ID:
          <input
            type="text"
            value={employeeId}
            onChange={handleEmployeeIdChange}
            required
          />
        </label>
        <br />
        <br />
        <label>
          Email ID:
          <input
            type="text"
            value={emailID}
            onChange={handleEmailChange}
            required
          />
        </label>
        <br />
        <br />
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} required />
        </label>
        <br />
        <br />
        <label>
          Phone Number:
          <input
            type="text"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </label>
        <br />
        <br />
        <label>
          Role:
          <select value={role} onChange={handleRoleChange} required>
            <option value="">Select Role</option>
            <option value="Operator">Operator</option>
            <option value="Checkpost op">Checkpost op</option>
            <option value="Mobile Squad">Mobile Squad</option>
          </select>
        </label>
        <br />
        <br />
        {isCheckpostOp && (
          <>
            <label>
              Checkpost Name:
              <select value={checkpostName} onChange={handleCheckpostNameChange}>
                <option value="">Select Checkpost</option>
                {checkposts.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
                ))}
            </select>
            </label>
            <br />
            <br />
          </>
        )}
        {isMobileSquad && (
          <>
            <label>
              Route Name:
              <select value={routeName} onChange={handleRouteNameChange}>
                <option value="">Select Route</option>
                {routes.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
                ))}
            </select>
            </label>
            <br />
            <br />
          </>
        )}
        <label>
          Company Name:
          <input
            type="text"
            value={companyName}
            onChange={handleCompanyNameChange}
          />
        </label>
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Employee;
