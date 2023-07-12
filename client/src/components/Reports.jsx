import React, { useEffect, useState } from 'react';
import '/src/styles/Reports.css';
import axios from 'axios';

const Reports = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [tableHtml, setTableHtml] = useState('');

  const getDetails= async(event)=>{
    setSelectedOption(event.target.value);
    console.log(event.target.value)
  const url = `http://localhost:8080/api/${event.target.value}`;

  try {
    const response = await axios.get(url);
    let tableHtml=""
    if (event.target.value==="checkposts" ||event.target.value==="routes" || event.target.value==="duties" || event.target.value==="employee" || event.target.value==="quarry"|| event.target.value==="permitmaster"|| event.target.value==="teams"|| event.target.value==="transportdetails"|| event.target.value==="sccc"|| event.target.value==="lessee") {
        if(event.target.value==="employee"){
            let email=localStorage.getItem('email')
            const company=response.data.filter((emp)=>emp.emailID===email)
            const info=response.data.filter((vals)=>vals.companyName===company[0].companyName)
            tableHtml=generateTable_simple(info,event.target.value)
            setTableHtml(tableHtml);
        }
        else{
        tableHtml = generateTable_simple(response.data,event.target.value);
        }
    }
    else if(event.target.value==="routetrackers"){
        tableHtml = generateTable_routetrack(response.data);
    }
    else if(event.target.value==="eligibility"){
        tableHtml = generateTable_eligibility(response.data);
    }
    setTableHtml(tableHtml);
    
  } catch (error) {
    console.error(error);
  }
};
  const handleGenerateReport =() => {
        const newWindow = window.open("", "_blank");
        newWindow.document.open();
        newWindow.document.write(tableHtml);
        newWindow.document.close();
      }
const handleDownloadReport = async() => {
    const blob = new Blob([tableHtml], { type: 'text/html' });
    const url2 = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url2;
    link.download = 'report.html';
    link.click();
    URL.revokeObjectURL(url2);
};
function generateTable_simple(data,selectedOption) {
    let headers=""
    if (selectedOption==="checkposts") {
        headers=["_id", "checkpostID", "name", "town", "division"];
    }
    else if(selectedOption==="employee"){
        headers= ["_id", "employeeId", "emailID", "name","phoneNumber","role","checkpostName","routeName","companyName"];
    }
    else if (selectedOption==="duties"){
        headers=["_id", "date", "teamId", "route"];
    }
    else if (selectedOption==="quarry"){
        headers=["_id", "syNo", "village", "mandal"],"district";
    }
    else if (selectedOption==="lessee"){
        headers=["_id", "LesseeID", "nameandaddress", "GST"];
    }
    else if (selectedOption==="duties"){
        headers=["_id", "date", "teamId", "route"];
    }
    else if (selectedOption==="permitmaster"){
        headers=["bookNumber", "formNumber", "currentDate", "validUpto","contractorName","agreementNo","gstRegistrationNo","districtAlloted","districtCode","lesseeId","lesseeNameandAddress","lesseeGstNo","syNo","village","mandal","district","leaseExtent","saleValue","mineralName","quantity","consigneeNameandAddress","driverLicenceNo","driverName","vehicleNo","destination","destinationDistance","arrivalDateTime","dispatchDateTime"];
    }
    else if (selectedOption==="sccc"){
        headers=["_id", "contractorName", "agreementNo", "gstRegistrationNo","districtAllotted","districtCode"];
    }
    else if (selectedOption==="teams"){
        headers=["_id", "teamId", "member1", "member2"];
    }
    else if (selectedOption==="transportdetails"){
        headers=["_id", "vehicleNo", "driverName", "driverLicenseNo"];
    }
    else if (selectedOption==="eligibility"){
        headers = ["_id", "lesseeID", "details"];
    }
    else if (selectedOption==="routes"){
        headers = ["_id", "routeName", "checkposts"];
    }
    else{
        //    
    }
  const tableHtml = `
    <table style="border-collapse: collapse;">
      <thead>
        <tr>
          ${headers.map((header) => `<th style="border: 1px solid black;">${header}</th>`).join("")}
        </tr>
      </thead>
      <tbody>
        ${data.map(
          (row) => `
          <tr>
            ${headers
              .map((header) => `<td style="border: 1px solid black;">${row[header]}</td>`)
              .join("")}
          </tr>
        `
        ).join("")}
      </tbody>
    </table>
  `;

  return tableHtml;
}
function generateTable_routetrack(data) {
    const headers = ["_id", "date", "time","location", "teamID", "checkpostID", "imageData"];
    const tableHtml = `
      <table style="border-collapse: collapse;">
        <thead>
          <tr>
            ${headers.map((header) => `<th style="border: 1px solid black;">${header}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${data
            .map(
              (row) => `
            <tr>
              ${headers
                .map((header) => {
                  if (header === "imageData") {
                    return `<td style="border: 1px solid black;"><img src="${row[header]}" alt="Image" /></td>`;
                  } else {
                    return `<td style="border: 1px solid black;">${row[header]}</td>`;
                  }
                })
                .join("")}
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `;
  
    return tableHtml;
  }
  function generateTable_eligibility(data) {
    let headers = ["_id", "lesseeID", "details"];
  
    const tableHtml = `
      <table style="border-collapse: collapse;">
        <thead>
          <tr>
            ${headers
              .map((header) => `<th style="border: 1px solid black;">${header}</th>`)
              .join("")}
          </tr>
        </thead>
        <tbody>
          ${data
            .map(
              (row) => `
              <tr>
                ${headers
                  .map((header) => {
                    if (header === "details") {
                      return `<td style="border: 1px solid black;">${generateSubTable_elig(row[header])}</td>`;
                    } else {
                      return `<td style="border: 1px solid black;">${row[header]}</td>`;
                    }
                  })
                  .join("")}
              </tr>
            `
            )
            .join("")}
        </tbody>
      </table>
    `;
  
    return tableHtml;
  }
  
  function generateSubTable_elig(details) {
    const subTableHtml = `
      <table style="border-collapse: collapse;">
        <thead>
          <tr>
            <th style="border: 1px solid black;">mineralName</th>
            <th style="border: 1px solid black;">weight</th>
          </tr>
        </thead>
        <tbody>
          ${details
            .map(
              (detail) => `
              <tr>
                <td style="border: 1px solid black;">${detail.mineralName}</td>
                <td style="border: 1px solid black;">${detail.weight}</td>
              </tr>
            `
            )
            .join("")}
        </tbody>
      </table>
    `;
  
    return subTableHtml;
  }
  
  return (
    <div className="report-container">
      <h2 className="report-label">Generate Report</h2>
      <select className="report-select" value={selectedOption} onChange={getDetails}>
        <option value="">Select an option</option>
        <option value="checkposts">Checkposts</option>
        <option value="employee">Employee</option>
        <option value="routetrackers">Route Tracker</option>
        <option value="routes">Routes</option>
        <option value="lessee">Lessee</option>
        <option value="teams">Teams</option>
        <option value="duties">Duty Tracker</option>
        <option value="transportdetails">Transport Details</option>
        <option value="sccc">SCCC Awardee Details</option>
        <option value="permitmaster">Permit Master</option>
        <option value="eligibility">Eligibility</option>
        <option value="quarry">Quarry</option>
      </select>
      <button className="report-button" onClick={handleGenerateReport}>Generate Report</button>
      <button className="report-button" onClick={handleDownloadReport}>Download Report</button>
    
    </div>
  );
};

export default Reports;
