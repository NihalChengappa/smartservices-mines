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
      // console.log(response.data[-1])
      const options = response.data.map((checkpost) => ({
        value: checkpost,
        label: checkpost,
      }));
      setCheckposts(options);
      console.log(options)
    } catch (error) {
      console.error('Error fetching checkposts:', error);
    }
  };

  const handleCheckpostChange = (selectedOptions) => {
    setSelectedCheckposts(selectedOptions.map((option) => option.value));
    console.log(selectedCheckposts)
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
      <h1 className="route-title">Create a Route</h1>
      <form onSubmit={handleSubmit}>
      <div className="label">
        <label className='route-label'>
          Route Name:
        </label>
        <input type="text" value={routeName} onChange={handleRouteNameChange} required />
      </div>
      <br></br>
      <div className="label"></div>
      <label className='checkposts-mapped'>Checkposts Mapped:</label>
      <div className="select-container">
        <Select
          value={checkposts.filter((checkpost) => selectedCheckposts.includes(checkpost.value))}
          options={checkposts}
          isMulti
          onChange={handleCheckpostChange}
          className='custom-select'
        />
        </div>

        <div className="create-route-button">
          <button type="submit">Create Route</button>
        </div>
      </form>
    </div>
  );
};

export default Routess;

