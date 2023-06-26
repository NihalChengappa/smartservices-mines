import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const Lessee = () => {
    const [LesseeID, setLesseeID] = useState('');
    const [nameandaddress, setNameandAdress] = useState('');
    const [GST, setGST] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make an HTTP POST request to store the data in MongoDB
      const url = 'http://localhost:8080/api/lessee';
      const response = await axios.post(url, {
        LesseeID,
        nameandaddress,
        GST,
      });

      console.log('Data stored in MongoDB:', response.data);
    } catch (error) {
      console.log('Error storing data in MongoDB:', error);
    }
  };

  return (
    <div>
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <h2>Lessee Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="LesseeID">Lessee ID*</label>
          <input
            type="text"
            id="LesseeID"
            value={LesseeID}
            onChange={(e) => setLesseeID(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="nameandaddress">Lessee Name & Address*</label>
          <input
            type="text"
            id="nameandaddress"
            value={nameandaddress}
            onChange={(e) => setNameandAdress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="GST">Lessee GST Reg. No.*</label>
          <input
            type="text"
            id="GST"
            value={GST}
            onChange={(e) => setGST(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Lessee;
