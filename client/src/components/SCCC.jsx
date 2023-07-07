import React, { useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import '/src/styles/SCCC.css';

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
    <div className="background-image">
      <div className="container-sccc">
        <Sidebar pageWrapId="page-wrap" outerContainerId="outer-container" />
        <div className="sccc-form-container">
          <h2 style={{ textAlign: 'center' }}>SCCC Form</h2>
          <form onSubmit={handleSubmit}>
            <table className="sccc-table">
              <tbody>
                <tr>
                  <td htmlFor="contractorName" align="right">
                    Contractor Name:
                  </td>
                  <td align="left">
                    <div className="sccc-input-container">
                      <input
                        type="text"
                        id="contractorName"
                        value={contractorName}
                        onChange={(e) => setContractorName(e.target.value)}
                        required
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td htmlFor="agreementNo" align="right">
                    Agreement No:
                  </td>
                  <td align="left">
                    <div className="sccc-input-container">
                      <input
                        type="text"
                        id="agreementNo"
                        value={agreementNo}
                        onChange={(e) => setAgreementNo(e.target.value)}
                        required
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td htmlFor="gstRegistrationNo" align="right">
                    GST Registration No:
                  </td>
                  <td align="left">
                    <div className="sccc-input-container">
                      <input
                        type="text"
                        id="gstRegistrationNo"
                        value={gstRegistrationNo}
                        onChange={(e) => setGstRegistrationNo(e.target.value)}
                        required
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td htmlFor="districtAllotted" align="right">
                    District Allotted:
                  </td>
                  <td align="left">
                    <div className="sccc-input-container">
                      <input
                        type="text"
                        id="districtAllotted"
                        value={districtAllotted}
                        onChange={(e) => setDistrictAllotted(e.target.value)}
                        required
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td htmlFor="districtCode" align="right">
                    District Code:
                  </td>
                  <td align="left">
                    <div className="sccc-input-container">
                      <input
                        type="text"
                        id="districtCode"
                        value={districtCode}
                        onChange={(e) => setDistrictCode(e.target.value)}
                        required
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <button type="submit" className="sccc-center-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SCCC;