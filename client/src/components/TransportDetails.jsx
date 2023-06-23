import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const TransportDetails = () => {
  const [vehicleNo, setvehicleNo] = useState('');
  const [driverName, setdriverName] = useState('');
  const [driverLicenseNo, setdriverLicenseNo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make an HTTP POST request to store the data in MongoDB
      const url = 'http://localhost:8080/api/transportdetails';
      const response = await axios.post(url, {
        vehicleNo,
        driverName,
        driverLicenseNo,
      });

      console.log('Data stored in MongoDB:', response.data);
    } catch (error) {
      console.log('Error storing data in MongoDB:', error);
    }
  };

  return (
    <div>
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <h2>Transport Details Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="vehicleNo">Vehicle Number*</label>
          <input
            type="text"
            id="vehicleNo"
            value={vehicleNo}
            onChange={(e) => setvehicleNo(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="driverName">Driver Name*</label>
          <input
            type="text"
            id="driverName"
            value={driverName}
            onChange={(e) => setdriverName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="driverLicenseNo">Driver License Number*</label>
          <input
            type="text"
            id="driverLicenseNo"
            value={driverLicenseNo}
            onChange={(e) => setdriverLicenseNo(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TransportDetails;
