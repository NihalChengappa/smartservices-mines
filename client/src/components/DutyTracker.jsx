import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import '/src/styles/DutyTracker.css';

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
        const team_ids = response.data.map((team) => team.teamId);
        const options=team_ids.map((team)=>({
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
    <div className="container-duty-tracker">
      <Sidebar pageWrapId="page-wrap" outerContainerId="outer-container" />
      <div className="dt-form-container">
        <h2 style={{ textAlign: 'center' }}>Duty Tracker Form</h2>
        <form onSubmit={handleSubmit}>
          <table className="duty-tracker-table">
            <tbody>
              <tr>
                <td htmlFor="date" align="right">
                  Date:
                </td>
                <td align="left">
                  <div className="dt-input-container">
                    <input
                      type="date"
                      id="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td htmlFor="teamId" align="right">
                  Team ID:
                </td>
                <td align="left">
                  <div className="dt-input-container">
                    <select
                      id="teamId"
                      value={teamId}
                      onChange={handleTeamChange}
                      required
                    >
                      <option value="">Select Team ID</option>
                      {teams.map((options) => (
                        <option key={options.value} value={options.value}>
                          {options.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>
              </tr>
              <tr>
                <td htmlFor="route" align="right">
                  Route:
                </td>
                <td align="left">
                  <div className="dt-input-container">
                    <select
                      id="route"
                      value={route}
                      onChange={handleRouteChange}
                      required
                    >
                      <option value="">Select Route</option>
                      {routes.map((options) => (
                        <option key={options.value} value={options.value}>
                          {options.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit" className="dt-center-button">
            Submit
          </button>
        </form>
      </div>
    </div>
);
};

export default DutyTracker;
