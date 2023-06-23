import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

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
    <div>
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <h2>Quarry Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="syNo">Sy No:</label>
          <input
            type="text"
            id="syNo"
            value={syNo}
            onChange={(e) => setSyNo(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="village">Village:</label>
          <input
            type="text"
            id="village"
            value={village}
            onChange={(e) => setVillage(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="mandal">Mandal:</label>
          <input
            type="text"
            id="mandal"
            value={mandal}
            onChange={(e) => setMandal(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="district">District:</label>
          <input
            type="text"
            id="district"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default QuarryForm;
