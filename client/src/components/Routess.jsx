import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Sidebar from './Sidebar';
import '/src/styles/routess.css'

const Routess = () => {
  const [checkposts, setCheckposts] = useState([]);
  const [selectedCheckposts, setSelectedCheckposts] = useState([]);
  const [routeName, setRouteName] = useState('');

  useEffect(() => {
    fetchCheckposts();
  }, []);

  const fetchCheckposts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/checkposts');
      const checkpostNames = response.data.map((checkpost) => checkpost.name);
      const options = checkpostNames.map((checkpost) => ({
        value: checkpost,
        label: checkpost,
      }));
      setCheckposts(options);
    } catch (error) {
      console.error('Error fetching checkposts:', error);
    }
  };

  const handleCheckpostChange = (selectedOptions) => {
    setSelectedCheckposts(selectedOptions.map((option) => option.value));
  };

  const handleRouteNameChange = (event) => {
    setRouteName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Prepare the data to be sent
      const data = {
        routeName,
        checkposts: selectedCheckposts,
      };
  
      // Send the POST request to the server
      await axios.post('http://localhost:8080/api/routes', data);
  
      // Reset form
      setSelectedCheckposts([]);
      setRouteName('');
      console.log('Route created successfully');
    } catch (error) {
      console.error('Error creating route:', error);
    }
  };
  

  return (
    <div>
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <div className="routes-container">
      <h2 className="route-title">Create a Route</h2>
      <form onSubmit={handleSubmit} className="route-form-container">
        <table className="routess-table">
          <tbody>
            <tr>
              <td htmlFor="routeName" align="right">Route Name:</td>
              <td align="left">
                <div className="route-input-container">
                  <input
                    type="text"
                    id="routeName"
                    value={routeName}
                    onChange={handleRouteNameChange}
                    required
                    className="form-input"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td htmlFor="checkposts" align="right">Checkposts Mapped:</td>
              <td align="left">
                <div className="route-input-container">
                  <Select
                    value={checkposts.filter((checkpost) => selectedCheckposts.includes(checkpost.value))}
                    options={checkposts}
                    isMulti
                    onChange={handleCheckpostChange}
                    className="custom-select"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit" className="route-center-button">Create Route</button>
      </form>
    </div>
    </div>
  );
};

export default Routess;

