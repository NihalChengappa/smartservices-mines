import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import '/src/styles/Lessee.css';

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
      <div className="lessee-container">
      <h2 className="lessee-title">Lessee Details</h2>
      <form onSubmit={handleSubmit}>
        <table className="lessee-table">
            <tbody>
              <tr>
                <td htmlFor="lesseeID" className="lessee-label">
                  Lessee ID:
                </td>
                <td>
                <div className="lessee-input-container">
                  <input
                    type="text"
                    id="lesseeID"
                    value={LesseeID}
                    onChange={(e) => setLesseeID(e.target.value)}
                    required
                  />
                  </div>
                </td>
              </tr>
              <tr>
                <td htmlFor="nameAndAddress" className="lessee-label">
                  Lessee Name &amp; Address:
                </td>
                <td>
                <div className="lessee-input-container">
                  <input
                    type="text"
                    id="nameAndAddress"
                    value={nameandaddress}
                    onChange={(e) => setNameandAdress(e.target.value)}
                    required
                  />
                  </div>
                </td>
              </tr>
              <tr>
                <td htmlFor="GST" className="lessee-label">
                  Lessee GST Reg. No.:
                </td>
                <td>
                <div className="lessee-input-container">
                  <input
                    type="text"
                    id="GST"
                    value={GST}
                    onChange={(e) => setGST(e.target.value)}
                    required
                  />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        <button type="submit" style={{ marginTop: '12px'}}>Submit</button>
      </form>
    </div>
    </div>
  );
};

export default Lessee;
