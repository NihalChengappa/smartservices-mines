import '/src/styles/Checkposts.css';
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
    <div className="background-image">
    <div className="containercheckpost">
        <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />   
      <div className="chk-form-container">
      <h2 style={{textAlign:"center"}}>Checkpost Form</h2>
      <form onSubmit={handleSubmit}>
        <table className="checkpost-table">
          <tbody>
            <tr>
              <td htmlFor="checkpostID" align="right">Checkpost ID*</td>
              <td align="left">
                <div className="chk-input-container">
                  <input
                    type="text"
                    id="checkpostID"
                    value={checkpostID}
                    onChange={(e) => setCheckpostID(e.target.value)}
                    required
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td htmlFor="name" align="right">Name*</td>
              <td align="left">
                <div className="chk-input-container">
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td htmlFor="town" align="right">Town</td>
              <td align="left">
                <div className="chk-input-container">
                  <input
                    type="text"
                    id="town"
                    value={town}
                    onChange={(e) => setTown(e.target.value)}
                    required
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td htmlFor="division" align="right">Division</td>
              <td align="left">
                <div className="chk-input-container">
                  <input
                    type="text"
                    id="division"
                    value={division}
                    onChange={(e) => setDivision(e.target.value)}
                    required
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        {/* <div className="space-line" /> */}
        <button type="submit" className="chk-center-button">Submit</button>
      </form>
      </div>
    </div>
    </div>
  );
};

export default Checkposts;
