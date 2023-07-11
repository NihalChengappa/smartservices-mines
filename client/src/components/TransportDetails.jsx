import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import '/src/styles/TransportDetails.css';

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
    // <div className="background-image">
      <div className="container-transport-details">
        <Sidebar pageWrapId="page-wrap" outerContainerId="outer-container" />
        <div className="transport-form-container">
          <h2 style={{ textAlign: 'center' }}>Transport Details Form</h2>
          <form onSubmit={handleSubmit}>
            <table className="transport-details-table">
              <tbody>
                <tr>
                  <td htmlFor="vehicleNo" align="right">
                    Vehicle Number:
                  </td>
                  <td align="left">
                    <div className="transport-input-container">
                      <input
                        type="text"
                        id="vehicleNo"
                        value={vehicleNo}
                        onChange={(e) => setvehicleNo(e.target.value)}
                        required
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td htmlFor="driverName" align="right">
                    Driver Name:
                  </td>
                  <td align="left">
                    <div className="transport-input-container">
                      <input
                        type="text"
                        id="driverName"
                        value={driverName}
                        onChange={(e) => setdriverName(e.target.value)}
                        required
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td htmlFor="driverLicenseNo" align="right">
                    Driver License Number:
                  </td>
                  <td align="left">
                    <div className="transport-input-container">
                      <input
                        type="text"
                        id="driverLicenseNo"
                        value={driverLicenseNo}
                        onChange={(e) => setdriverLicenseNo(e.target.value)}
                        required
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <button  style={{textAlign:"center"}}type="submit" className="transport-center-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    // </div>
  );
};

export default TransportDetails;