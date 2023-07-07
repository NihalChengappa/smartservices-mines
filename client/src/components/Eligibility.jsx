import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import '/src/styles/Eligibility.css';

const Eligibility = () => {
  const [lesseeID, setLesseeID] = useState('');
  const [details, setDetails] = useState([{ mineralName: '', weight: '' }]);
  const [lesseeids,setLesseeids]=useState([]);

  const handleDetailChange = (index, field, value) => {
    const updatedDetails = [...details];
    updatedDetails[index][field] = value;
    setDetails(updatedDetails);
  };

  const addDetail = () => {
    setDetails([...details, { mineralName: '', weight: '' }]);
  };

  const removeDetail = (index) => {
    const updatedDetails = [...details];
    updatedDetails.splice(index, 1);
    setDetails(updatedDetails);
  };
  const handleLesseeChange=(event)=>{
    setLesseeID(event.target.value);
  }
  
  useEffect(() => {
    getLessee();
    // console.log(routes);
  }, []);
  const getLessee=async()=>{
    try {
      const response = await axios.get('http://localhost:8080/api/lessee');
      const lesseeids = response.data.map((lessee) => lessee.LesseeID);
      const options = lesseeids.map((lessee) => ({
        value: lessee,
        label: lessee,
      }));
      setLesseeids(options);
    } catch (error) {
      console.error('Error fetching LesseeIDs:', error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an HTTP POST request to store the data in MongoDB
      const url = 'http://localhost:8080/api/eligibility';
      const response = await axios.post(url, {
        lesseeID,
        details,
      });

      console.log('Data stored in MongoDB:', response.data);
    } catch (error) {
      console.log('Error storing data in MongoDB:', error);
    }
  };

  return (
    <div className="container">
      <Sidebar pageWrapId="page-wrap" outerContainerId="outer-container" />
      <div className="eligibility-form-container">
        <h2 style={{ textAlign: "center" }}>Eligibility Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="eligibility-form-group">
            <label htmlFor="lesseeID" style={{ marginRight: '8px'}}>Lessee ID:</label>
            <select
              id="lesseeID"
              value={lesseeID}
              onChange={handleLesseeChange}
              required
              style={{ width: '315px', height: '25px' }} // Increase the height of the dropdown box
            >
              <option value="">Select ID</option>
              {lesseeids.map((options) => (
                <option key={options.value} value={options.value}>
                  {options.label}
                </option>
              ))}
            </select>
          </div>
          {details.map((detail, index) => (
            <div key={index} className="eligibility-form-group">
              <label htmlFor={`mineralName${index}`} style={{ marginRight: '8px'}}>Mineral Name:</label>
              <input
                type="text"
                id={`mineralName${index}`}
                value={detail.mineralName}
                onChange={(e) =>
                  handleDetailChange(index, 'mineralName', e.target.value)
                }
                required
                style={{ width: '200px' }}
              />

              <label htmlFor={`weight${index}`} style={{ marginRight: '8px', marginLeft: '8px'}}>Weight:</label>
              <input
                type="number"
                id={`weight${index}`}
                value={detail.weight}
                onChange={(e) =>
                  handleDetailChange(index, 'weight', Number(e.target.value))
                }
                required
                style={{ width: '200px' }}
              />
              {index !== 0 && (
                <button
                  type="button"
                  onClick={() => removeDetail(index)}
                  className="remove-button"
                  style={{marginLeft: '8px'}}
                >
                  Remove Mineral
                </button>
              )}
            </div>
          ))}
          <button type="button" style={{ marginTop: '12px'}} onClick={addDetail} className="add-button">
            Add Mineral
          </button>
          <div className="space-line" />
          <button type="submit" className="submit-eligibility-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Eligibility;