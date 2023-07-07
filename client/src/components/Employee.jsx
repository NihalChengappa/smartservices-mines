import '/src/styles/Employee.css';
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
      const route=response.data.map((item) => item.routeName)
      const options = route.map((route) => ({
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
    <div className='containeremployee'>
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <div className='employeeform-container'>
      <h1 style={{color:"#ed0a52", textAlign: "center"}}>Employee Form</h1>
      <form onSubmit={handleSubmit} className="employee-form">
  <table className="employee-table">
    <tbody>
      <tr>
        <td htmlFor="employeeId" align="right">Employee ID:</td>
        <td align="left">
          <div className="emp-input-container">
            <input
              type="text"
              id="employeeId"
              value={employeeId}
              onChange={handleEmployeeIdChange}
              required
            />
          </div>
        </td>
      </tr>
      <tr>
        <td htmlFor="emailID" align="right">Email ID:</td>
        <td align="left">
          <div className="emp-input-container">
            <input
              type="text"
              id="emailID"
              value={emailID}
              onChange={handleEmailChange}
              required
            />
          </div>
        </td>
      </tr>
      <tr>
        <td htmlFor="name" align="right">Name:</td>
        <td align="left">
          <div className="emp-input-container">
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>
        </td>
      </tr>
      <tr>
        <td htmlFor="phoneNumber" align="right">Phone Number:</td>
        <td align="left">
          <div className="emp-input-container">
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
          </div>
        </td>
      </tr>
      <tr>
        <td htmlFor="role" align="right">Role:</td>
        <td align="left">
          <div className="emp-input-container">
            <select
              id="role"
              value={role}
              onChange={handleRoleChange}
              required
            >
              <option value="">Select Role</option>
              <option value="Operator">Operator</option>
              <option value="Checkpost op">Checkpost op</option>
              <option value="Mobile Squad">Mobile Squad</option>
            </select>
          </div>
        </td>
      </tr>
      {isCheckpostOp && (
        <tr>
          <td htmlFor="checkpostName" align="right">Checkpost Name:</td>
          <td align="left">
            <div className="emp-input-container">
              <select
                id="checkpostName"
                value={checkpostName}
                onChange={handleCheckpostNameChange}
              >
                <option value="">Select Checkpost</option>
                {checkposts.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </td>
        </tr>
      )}
      {isMobileSquad && (
        <tr>
          <td htmlFor="routeName" align="right">Route Name:</td>
          <td align="left">
            <div className="emp-input-container">
              <select
                id="routeName"
                value={routeName}
                onChange={handleRouteNameChange}
              >
                <option value="">Select Route</option>
                {routes.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </td>
        </tr>
      )}
      <tr>
        <td htmlFor="companyName" align="right">Company Name:</td>
        <td align="left">
          <div className="emp-input-container">
            <input
              type="text"
              id="companyName"
              value={companyName}
              onChange={handleCompanyNameChange}
            />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  {/* <div className="space-line" /> */}
  <button type="submit" className="emp-center-button">Submit</button>
</form>


    </div>
    </div>
  );
};

export default Employee;
