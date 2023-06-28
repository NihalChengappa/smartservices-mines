import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const DutyTracker = () => {
  const [date, setDate] = useState(getFormattedDate());
  const [teamId, setTeamId] = useState('');
  const [route, setRoute] = useState('');
  const [teams,setTeams]=useState([]);
  const [routes,setRoutes]=useState([]);

  useEffect(()=>{
    getTeams();
    // console.log(teams);
  })
  const getTeams = async()=>{
    try {
        const response=await axios.get('http://localhost:8080/api/teams')
        const options=response.data.map((team)=>({
            value: team,
            label: team,
        }))
        setTeams(options);
    } catch (error) {
        console.error('Error fetching Teams:', error);
    }
  }
  useEffect(()=>{
    getRoutes();
    // console.log(teams);
  })
  const getRoutes = async()=>{
    try {
        const response=await axios.get('http://localhost:8080/api/routes')
        const routeNames = response.data.map((route) => route.routeName);
        const options=routeNames.map((route)=>({
            value: route,
            label: route,
        }))
        setRoutes(options);
    } catch (error) {
        console.error('Error fetching Routes:', error);
    }
  }
  const handleTeamChange=(event)=>{
    setTeamId(event.target.value)
  }
  const handleRouteChange=(event)=>{
    setRoute(event.target.value)
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const url="http://localhost:8080/api/duties"
        const response=await axios.post(url,{date,teamId,route})
        console.log('Data stored in MongoDB:', response.data);
    } catch (error) {
        console.log('Error storing data in MongoDB:', error)
    }
    setDate(getFormattedDate());
    setTeamId('');
    setRoute('');
  };

  // Function to get the current date in "YYYY-MM-DD" format
  function getFormattedDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    let day = today.getDate();
    day = day < 10 ? '0' + day : day;
    return `${year}-${month}-${day}`;
  }

  return (
    <div>
        <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <h2>Duty Tracker</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="teamId">Team ID:</label>
          <select value={teamId} onChange={handleTeamChange}>
            <option value={""}>Select Team-ID</option>
            {teams.map((options)=>(
                <option key={options.value} value={options.value}>
                    {options.label}
                </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="route">Route:</label>
          <select value={route} onChange={handleRouteChange}>
            <option value={""}>Select Route</option>
            {routes.map((options)=>(
                <option key={options.value} value={options.value}>
                    {options.label}
                </option>
            ))}
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DutyTracker;