import React, { useState, useEffect } from 'react';
import '/src/styles/Alert.css';
import axios from 'axios';

const Alert = () => {
  const [route, setRoute] = useState('');
  const [team, setTeam] = useState('');
  const [startdatetime, setStartDatetime] = useState(formatDatetime(new Date()));
  const [enddatetime, setEndDatetime] = useState(formatDatetime(new Date()));
  const [routes, setRoutes] = useState([]);
  const [teams, setTeams] = useState([]);
  const [checkposts,setCheckposts]=useState([]);
  const [routeCheckposts, setRouteCheckposts] = useState({});

  const handleRouteChange = (event) => {
    setRoute(event.target.value);
    setTeam(''); // Reset the team when the route changes
  };

  const handleTeamChange = (event) => {
    setTeam(event.target.value);
  };

  const handleStartDatetimeChange = (event) => {
    setStartDatetime(event.target.value);
  };
  const handleEndDatetimeChange = (event) => {
    setEndDatetime(event.target.value);
  };
  function show_alerts(data, checkposts, routetrackers, checkpostnames) {
    const headers = ["route", "team", "startdatetime", "enddatetime", "Checkposts Mapped", "Checkposts Covered"];
  
    const tableHtml = `
      <table style="border-collapse: collapse;">
        <thead>
          <tr>
            ${headers.map((header) => `<th style="border: 1px solid black;">${header}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${data.map((row) => {
            const routeName = row["route"];
            const checkpostValues = checkposts[routeName] || []; 
            const checkpostHtml = checkpostValues.map((value) => `<span>${value}</span>`).join(", ");

            const routeTrackersForTeam = routetrackers.filter(
              (tracker) =>
                tracker.teamID === row["team"] && new Date(addLeadingZeroToMonth(tracker.date.split("/").reverse().join("-"))) <= new Date(row["enddatetime"].split("T")[0]) &&
                new Date(addLeadingZeroToMonth(tracker.date.split("/").reverse().join("-"))) >= new Date(row["startdatetime"].split("T")[0])
            );
            const checkpostNamesForTeam = routeTrackersForTeam.map((tracker) => checkpostnames.find((name) => name.checkpostID === tracker.checkpostID).name
            );
            const uniquecheckposts=Array.from(new Set(checkpostNamesForTeam));
  
            const checkpostNamesHtml = uniquecheckposts.map((value) => `<span>${value}</span>`).join(", ");
            
            return `
              <tr>
                <td style="border: 1px solid black;">${row["route"]}</td>
                <td style="border: 1px solid black;">${row["team"]}</td>
                <td style="border: 1px solid black;">${row["startdatetime"]}</td>
                <td style="border: 1px solid black;">${row["enddatetime"]}</td>
                <td style="border: 1px solid black;">${checkpostHtml}</td>
                <td style="border: 1px solid black; background-color: ${uniquecheckposts.length===checkpostValues.length ? 'green' : 'red'};">${checkpostNamesHtml}</td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    `;
  
    return tableHtml;
  }
  
  
  // Helper function to extract time value from the time string in format "3:22:25 am"
  function addLeadingZeroToMonth(dateString) {
    const [year, month, day] = dateString.split("-");
    const formattedMonth = month.length === 1 ? `0${month}` : month;
    return `${year}-${formattedMonth}-${day}`;
  }
  
  
  const getRouteTrackers= async()=>{
    try {
      const url = 'http://localhost:8080/api/routetrackers';
      const response = await axios.get(url);
      return response.data;
      
    } catch (error) {
      console.error(error);
    }
  };
  const getCheckposts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/checkposts');
      return response.data;
    } catch (error) {
      console.error('Error fetching Alerts:', error);
    }
  };
  const getAlerts = async () => {
    try {
      const r_trackers=await(getRouteTrackers());
      const checkposts=await(getCheckposts());
      const response = await axios.get('http://localhost:8080/api/alerts');
      const tableHTML=show_alerts(response.data,routeCheckposts,r_trackers,checkposts)
      return tableHTML;
    } catch (error) {
      console.error('Error fetching Alerts:', error);
    }
  };
  const handleGenerateAlerts =async() => {
    let response=await(getAlerts())
    let response2=await(getRouteTrackers())
    const newWindow = window.open("", "_blank");
    newWindow.document.open();
    newWindow.document.write(response);
    newWindow.document.close();
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = 'http://localhost:8080/api/alerts';
      const response = await axios.post(url, { route, team, startdatetime,enddatetime });
      console.log('Data stored in MongoDB:', response.data);
    } catch (error) {
      console.log('Error storing data in MongoDB:', error);
    }
  };

  useEffect(() => {
    getRoutes();
  }, []);

  const getRoutes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/routes');
      const route = response.data.map((item) => item.routeName);
      const options = route.map((route) => ({
        value: route,
        label: route,
      }));
      setRoutes(options);
      const routesData = response.data.map((item) => ({
        routeName: item.routeName,
        checkposts: item.checkposts,
      }));
      setRouteCheckposts(
        routesData.reduce((acc, routeData) => {
          acc[routeData.routeName] = routeData.checkposts;
          return acc;
        }, {})
      );

    } catch (error) {
      console.error('Error fetching Routes:', error);
    }
  };

  useEffect(() => {
    if (route) {
      getTeams();
    }
  }, [route]);

  const getTeams = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/duties');
      const duty = response.data.filter((duties) => duties.route === route);
      const teams = duty.map((duty) => duty.teamId);
      const options = teams.map((team) => ({
        value: team,
        label: team,
      }));
      setTeams(options);
    } catch (error) {
      console.error('Error fetching Teams:', error);
    }
  };

  // Helper function to format datetime to the required format
  function formatDatetime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  return (
    <div className='alert-container'>
    <form onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td align="right">
              <label htmlFor="route">Select Route:</label>
            </td>
            
            <td >
              <select id="route" value={route} onChange={handleRouteChange}>
                <option value="">Select Route</option>
                {routes.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          {route && (
            <tr>
              <td align="right">
                <label htmlFor="team">Select Team:</label>
              </td>
              <td>
                <select id="team" value={team} onChange={handleTeamChange}>
                  <option value="">Select Team</option>
                  {teams.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          )}
          <tr>
            <td align="right">
              <label htmlFor="startdatetime">Select StartDateTime:</label>
            </td>
            <td>
              <input
                id="startdatetime"
                type="datetime-local"
                value={startdatetime}
                onChange={handleStartDatetimeChange}
              />
            </td>
          </tr>
          <tr>
            <td align="right">
              <label htmlFor="enddatetime">Select EndDateTime:</label>
            </td>
            <td>
              <input
                id="enddatetime"
                type="datetime-local"
                value={enddatetime}
                onChange={handleEndDatetimeChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
    <div className='buttons'>
    <button type="submit">Create Alert</button>
    <button onClick={handleGenerateAlerts}>View Alerts</button>
    </div>
  </div>

  );
};

export default Alert;
