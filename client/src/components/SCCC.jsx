import React, { useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';

const SCCC = () => {
  const [contractorName, setContractorName] = useState('');
  const [agreementNo, setAgreementNo] = useState('');
  const [gstRegistrationNo, setGstRegistrationNo] = useState('');
  const [districtAllotted, setDistrictAllotted] = useState('');
  const [districtCode, setDistrictCode] = useState('');
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const url="http://localhost:8080/api/sccc"
        const response=await axios.post(url,{contractorName,agreementNo,gstRegistrationNo,districtAllotted,districtCode});
        console.log('Data stored in MongoDB:', response.data);
    } catch (error) {
      console.log('Error storing data in MongoDB:', error);
    }
    setContractorName('');
    setAgreementNo('');
    setGstRegistrationNo('');
    setDistrictAllotted('');
    setDistrictCode('');
  };

  return (
    <div>
        <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <h1>SCCC Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Contractor Name:</label>
          <input
            type="text"
            value={contractorName}
            onChange={(e) => setContractorName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Agreement No:</label>
          <input
            type="text"
            value={agreementNo}
            onChange={(e) => setAgreementNo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>GST Registration No:</label>
          <input
            type="text"
            value={gstRegistrationNo}
            onChange={(e) => setGstRegistrationNo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>District Allotted:</label>
          <input
            type="text"
            value={districtAllotted}
            onChange={(e) => setDistrictAllotted(e.target.value)}
            required
          />
        </div>
        <div>
          <label>District Code:</label>
          <input
            type="text"
            value={districtCode}
            onChange={(e) => setDistrictCode(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SCCC;
