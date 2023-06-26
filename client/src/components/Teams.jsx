import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

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
    // Perform form validation and handle form submission logic here
    // You can check for the uniqueness of the team ID and other validations

    // Reset the form after submission
    setTeamId('');
    setMember1('');
    setMember2('');
  };


  return (
    <div>
    <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <h2>Create a Team</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="teamId">Team ID:</label>
          <input
            type="text"
            id="teamId"
            value={teamId}
            onChange={(e) => setTeamId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="member1">Member 1:</label>
          <select value={member1} onChange={handleMember1Change}>
            <option value={""}>Select Member</option>
            <option value={""}>No Member</option>
            {members.map((options)=>(
                <option key={options.value} value={options.value}>
                    {options.label}
                </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="member2">Member 2:</label>
          <select value={member2} onChange={handleMember2Change}>
            <option value={""}>Select Member</option>
            <option value={""}>No Member</option>
            {members.map((options)=>(
                <option key={options.value} value={options.value}>
                    {options.label}
                </option>
            ))}
          </select>
        </div>
        <button type="submit">Create Team</button>
      </form>
    </div>
  );
};

export default Teams;
