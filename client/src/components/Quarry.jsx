import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import '/src/styles/Quarry.css';

const QuarryForm = () => {
  const [syNo, setSyNo] = useState('');
  const [village, setVillage] = useState('');
  const [mandal, setMandal] = useState('');
  const [district, setDistrict] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an HTTP POST request to store the data in MongoDB
      const url = 'http://localhost:8080/api/quarry';
      const response = await axios.post(url, {
        syNo,
        village,
        mandal,
        district,
      });

      console.log('Data stored in MongoDB:', response.data);
    } catch (error) {
      console.log('Error storing data in MongoDB:', error);
    }
  };

  return (
    <div className="containerquarry">
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <div className="quarry-form-container">
        <h2>Quarry Form</h2>
        <form onSubmit={handleSubmit}>
          <table className="quarry-table">
            <tbody>
              <tr>
                <td htmlFor="syNo">Sy No:</td>
                <td>
                <div className="quarry-input-container">
                  <input
                    type="text"
                    id="syNo"
                    value={syNo}
                    onChange={(e) => setSyNo(e.target.value)}
                  />
                </div>
                </td>
              </tr>
              <tr>
                <td htmlFor="village">Village:</td>
                <td>
                  <div className="quarry-input-container">
                  <input
                    type="text"
                    id="village"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                  />
                  </div>
                </td>
              </tr>
              <tr>
                <td htmlFor="mandal">Mandal:</td>
                <td>
                  <div className="quarry-input-container">
                  <input
                    type="text"
                    id="mandal"
                    value={mandal}
                    onChange={(e) => setMandal(e.target.value)}
                  />
                  </div>
                </td>
              </tr>
              <tr>
                <td htmlFor="district">District:</td>
                <td>
                  <div className="quarry-input-container">
                  <input
                    type="text"
                    id="district"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                  />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit" className="quarry-center-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default QuarryForm;