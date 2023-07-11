import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import '/src/styles/Teams.css';

const Teams = () => {
  const [teamId, setTeamId] = useState('');
  const [member1, setMember1] = useState('');
  const [member2, setMember2] = useState('');
  const[members,setMembers]=useState([]);

  const handleMember1Change = (event) => {
    setMember1(event.target.value);
  };

  const handleMember2Change = (event) => {
    setMember2(event.target.value);
  };

  useEffect(()=>{
    getMembers();
    // console.log(members);
  },[])

  const getMembers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/employee');
      const employeeNames = response.data.filter((employee) => employee.role === "Mobile Squad").map((employee) => employee.name);
      const options = employeeNames.map((employee) => ({
        value: employee,
        label: employee,
      }));
      setMembers(options);
    //   console.log(options)
    } catch (error) {
      console.error('Error fetching Employees:', error);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const url="http://localhost:8080/api/teams"
        const response = await axios.post(url,{teamId,member1,member2});
        
        // Make an HTTP POST request to store the data in MongoDB
        console.log('Data stored in MongoDB:', response.data);
      } catch (error) {
        if(error.response?.status===400)
        {
            console.log("A checkpoint with the same Employee ID already exists.")
        }
        else{
            console.log('Error storing data in MongoDB:', error)
        }
      }
    setTeamId('');
    setMember1('');
    setMember2('');
  };


  return (
    <div className="background-image">
      <div className="container-teams">
        <Sidebar pageWrapId="page-wrap" outerContainerId="outer-container" />
        <div className="team-form-container">
          <h2 style={{textAlign:"center"}}>Create a Team</h2>
          <form onSubmit={handleSubmit}>
            <table className="teams-table">
              <tbody>
                <tr>
                  <td htmlFor="teamId" align="right">
                    Team ID*
                  </td>
                  <td align="left">
                    <div className="team-input-container">
                      <input
                        type="text"
                        id="teamId"
                        value={teamId}
                        onChange={(e) => setTeamId(e.target.value)}
                        required
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td htmlFor="member1" align="right">
                    Member 1*
                  </td>
                  <td align="left">
                    <div className="team-input-container">
                      <select value={member1} onChange={handleMember1Change} required>
                        <option value="">Select Member</option>
                        <option value="">No Member</option>
                        {members.map((options) => (
                          <option key={options.value} value={options.value}>
                            {options.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td htmlFor="member2" align="right">
                    Member 2*
                  </td>
                  <td align="left">
                    <div className="team-input-container">
                      <select value={member2} onChange={handleMember2Change} required>
                        <option value="">Select Member</option>
                        <option value="">No Member</option>
                        {members.map((options) => (
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
            <button type="submit" className="team-center-button">
              Create Team
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Teams;
