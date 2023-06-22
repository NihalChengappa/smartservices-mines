import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const Checkposts = () => {
  const [checkpostID, setCheckpostID] = useState('');
  const [name, setName] = useState('');
  const [town, setTown] = useState('');
  const [division, setDivision] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        // Check if a checkpoint with the same Checkpost ID already exists
        const url="http://localhost:8080/api/checkposts"
        // console.log(url,{checkpostID,name,town,division})
        const response = await axios.post(url,{checkpostID,name,town,division});
  
        // Make an HTTP POST request to store the data in MongoDB
        console.log('Data stored in MongoDB:', response.data);
      } catch (error) {
        if(error.response?.status===400)
        {
            console.log("A checkpoint with the same Checkpost ID already exists.")
        }
        else{
            console.log('Error storing data in MongoDB:', error)
        }
      }
    };

  return (
    <div>
        <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />   
      <h2>Checkpost Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="checkpostID">Checkpost ID*</label>
          <input
            type="text"
            id="checkpostID"
            value={checkpostID}
            onChange={(e) => setCheckpostID(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Name*</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="town">Town</label>
          <input
            type="text"
            id="town"
            value={town}
            onChange={(e) => setTown(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="division">Division</label>
          <input
            type="text"
            id="division"
            value={division}
            onChange={(e) => setDivision(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Checkposts;
