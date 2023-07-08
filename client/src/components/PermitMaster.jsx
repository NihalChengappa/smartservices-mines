import React, { useEffect, useState,useRef } from 'react';
import govt from '/src/assets/govt.jpeg';
import ReactToPrint from 'react-to-print';
import Sidebar from './Sidebar';
import QRCode from "react-qr-code";
import axios from 'axios';
import '/src/styles/PermitMaster.css'

const PermitMaster = () => {
  const [bookNumber, setBookNumber] = useState('');
  const [formNumber, setFormNumber] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [validUpto, setValidUpto] = useState(() => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 14);
    return currentDate.toISOString().split('T')[0];
  });

  const [contractorName, setContractorName] = useState('');
  const [agreementNo, setAgreementNo] = useState('');
  const [gstRegistrationNo, setGstRegistrationNo] = useState('');
  const [districtAllotted, setDistrictAllotted] = useState('');
  const [districtCode, setDistrictCode] = useState('');

  const [lesseeId, setLesseeId] = useState('');
  const [lesseeNameandAddress, setLesseeNameandAddress] = useState('');
  const [lesseeGstNo, setLesseeGstNo] = useState('');
  const [lesseeids,setLesseeids]=useState([]);

  const [syNo, setSyNo] = useState('');
  const [village, setVillage] = useState('');
  const [mandal, setMandal] = useState('');
  const [district, setDistrict] = useState('');
  const [leaseExtent, setLeaseExtent] = useState('');
  const [saleValue, setSaleValue] = useState('');
  const [mineralName, setMineralName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [synos,setSynos]=useState([]);

  const [consigneeNameandAddress, setConsigneeNameandAddress] = useState('');

  const [driverLicenceNo, setDriverLicenceNo] = useState('');
  const [driverName, setDriverName] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');
  const [destination, setDestination] = useState('');
  const [destinationDistance, setDestinationDistance] = useState('');
  const [arrivalDateTime, setArrivalDateTime] = useState('');
  const [dispatchDateTime, setDispatchDateTime] = useState('');
  const [licencenos,setLicencenos]=useState([]);
  const [qrCode, setQrCode] = useState('');
  const printRef = useRef();
  useEffect(()=>{
    getForm();
  },[]);
  const getForm = async (e) => {
    const url = "http://localhost:8080/api/permitmaster";
    const response = await axios.get(url);
    let formNumber,bookNumber;
    if (response.data.length=== 0) {
      formNumber = "100000";
      bookNumber="1000"
    } else {
      const forms = response.data;
      const lastEntry = forms[forms.length - 1];
      console.log(lastEntry)
      const lastFormNumber = parseInt(lastEntry.formNumber);
      const lastBookNumber=parseInt(lastEntry.bookNumber);
      formNumber = (lastFormNumber + 1).toString();
      bookNumber = (lastBookNumber + 1).toString();
    }
  
    setFormNumber(formNumber);
    setBookNumber(bookNumber);
  };
  useEffect(() => {
    getCompany();
    // console.log(routes);
  }, []);
  useEffect(() => {
    setQrCode("<" + districtCode + ">" + "<" + districtCode + "/" + formNumber + ">" + "<" + districtCode + "/" + bookNumber + ">");
  
  }, [getForm, districtCode, formNumber, bookNumber]);
  useEffect(() => {
    getLessee();
    getQuarry();
    getLicense();
    // console.log(routes);
  }, []);
  const getLessee=async()=>{
    try {
      const response = await axios.get('http://localhost:8080/api/lessee');
      const lesseeids = response.data.map((lessee) => lessee.LesseeID);
      const options = lesseeids.map((lessee) => ({
        value: lessee,
        label: lessee,
      }));
      setLesseeids(options);
    } catch (error) {
      console.error('Error fetching LesseeIDs:', error);
    }
  }
  const getLesseeDetails=async(lesseeid)=>{
    const response = await axios.get('http://localhost:8080/api/lessee');
    const quarrydata = response.data.filter((lessee)=>lessee.LesseeID===lesseeid)
    setLesseeNameandAddress(quarrydata[0].nameandaddress)
    setLesseeGstNo(quarrydata[0].GST)
  }
  const getQuarry=async()=>{
    try {
      const response = await axios.get('http://localhost:8080/api/quarry');
      const quarry = response.data.map((quarry) => quarry.syNo);
      const options = quarry.map((sy) => ({
        value: sy,
        label: sy,
      }));
      setSynos(options);
    } catch (error) {
      console.error('Error fetching Synos:', error);
    }
  }
  const getQuarryDetails=async(Syno)=>{
    const response = await axios.get('http://localhost:8080/api/quarry');
    const quarrydata = response.data.filter((quarry)=>quarry.syNo===Syno)
    setVillage(quarrydata[0].village)
    setMandal(quarrydata[0].mandal)
    setDistrict(quarrydata[0].district)
  }
  const getLicense=async()=>{
    try {
      const response = await axios.get('http://localhost:8080/api/transportdetails');
      // console.log(response)
      const licence = response.data.map((licence) => licence.driverLicenseNo);
      const options = licence.map((licenceno) => ({
        value: licenceno,
        label: licenceno,
      }));
      setLicencenos(options);
    } catch (error) {
      console.error('Error fetching licencenos:', error);
    }
  }
  const getLicenceDetails=async(licenceno)=>{
    const response = await axios.get('http://localhost:8080/api/transportdetails');
    console.log(response.data,licenceno)
    const driverdetails = response.data.filter((driver)=>driver.driverLicenseNo===licenceno)
    console.log(driverdetails)
    setVehicleNo(driverdetails[0].vehicleNo)
    setDriverName(driverdetails[0].driverName)
  }
  
  const getCompany = async () => {
    try {
      let email = localStorage.getItem('email');
      const response1 = await axios.get('http://localhost:8080/api/employee');
      const comp = response1.data.filter((employee) => employee.emailID === email)[0].companyName;
      if (comp) {
        getSCCC(comp);
      }
    } catch (error) {
      console.error('Error fetching Company details:', error);
    }
  };
  const handleLesseeChange=(event)=>{
    setLesseeId(event.target.value);
    getLesseeDetails(event.target.value);
  }
  const handleSyChange=(event)=>{
    setSyNo(event.target.value);
    getQuarryDetails(event.target.value);
  }
  const handleDriverChange=(event)=>{
    setDriverLicenceNo(event.target.value);
    getLicenceDetails(event.target.value);
  }
  const handleMineralChange=async(event)=>{
    try{
      const response=await axios.get('http://localhost:8080/api/eligibility')
      const details=response.data.filter((eligibility) => eligibility.lesseeID===lesseeId)[0].details
      const minerals=details.filter((minerals)=>minerals.mineralName==event.target.value)
      if (minerals.length===0) {
        console.log("Not eligible for this mineral!!")
        setMineralName('');
      }
      else{
        console.log("Valid Mineral!")
      }
  }
    catch(error){
      console.error('Error fetching Mineral details:', error);
    }
  }
  const handleQuantityChange=async(event)=>{
    try{
      const response=await axios.get('http://localhost:8080/api/eligibility')
      const details=response.data.filter((eligibility) => eligibility.lesseeID===lesseeId)[0].details
      const minerals=details.filter((minerals)=>minerals.mineralName===mineralName)
      if (minerals.length===0) {
        console.log("Please enter a mineral!!")
        setQuantity('');
      }
      else{
        let weight=minerals[0].weight
        if (event.target.value>weight) {
          console.log("Quantity has exceeded eligible limit!")
          setQuantity('')
        }
        else{
          console.log("Valid amount!")
        }
      }
  }
    catch(error){
      console.error('Error fetching Mineral details:', error);
    }
  }
  
  const getSCCC = async (company) => {
    try {
      const response2 = await axios.get('http://localhost:8080/api/sccc');
      const cname = response2.data.filter((sccc) => sccc.contractorName === company);
      setAgreementNo(cname[0].agreementNo);
      setContractorName(cname[0].contractorName);
      setGstRegistrationNo(cname[0].gstRegistrationNo);
      setDistrictAllotted(cname[0].districtAllotted);
      setDistrictCode(cname[0].districtCode);
    } catch (error) {
      console.error('Error fetching SCCC details:', error);
    }
  };
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const url="http://localhost:8080/api/permitmaster"
      const response=await axios.post(url,{bookNumber,formNumber,currentDate,validUpto,contractorName,agreementNo,gstRegistrationNo,districtAllotted,districtCode,lesseeId,lesseeNameandAddress,lesseeGstNo,syNo,village,mandal,district,leaseExtent,saleValue,mineralName,quantity,consigneeNameandAddress,driverLicenceNo,driverName,vehicleNo,destination,destinationDistance,arrivalDateTime,dispatchDateTime})
      console.log("Permit Data successfully stored!",response.data)
      const url2=`http://localhost:8080/api/eligibility/${lesseeId}/${mineralName}`
      const response2=await axios.put(url2,{quantity})
      console.log("Eligibility Updated!",response2.data)
    } catch (error) {
      console.log('Error storing data in MongoDB:', error);
    }
    getForm();
    getCompany();

    setLesseeId('');
    setLesseeNameandAddress('');
    setLesseeGstNo('');

    setSyNo('');
    setVillage('');
    setMandal('');
    setDistrict('');
    setLeaseExtent('');
    setSaleValue('');
    setMineralName('');
    setQuantity('');
    setConsigneeNameandAddress('');

    setDriverLicenceNo('');
    setDriverName('');
    setVehicleNo('');
    setDestination('');
    setDestinationDistance('');
    setArrivalDateTime('');
    setDispatchDateTime('');
  };

  return (
    <div  className="permit-master-container">
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
    <form onSubmit={handleSubmit}>
    <div ref={printRef} >
    <div>
      <img className="hide-in-app" src={govt} alt="Print Image" />
      <img className="watermark" src={govt} alt="Print Image" />
    </div>
    <h2 className='subhead2'>MINOR MINERAL TRANSPORTAION DETAILS</h2>
    <h2 className='subhead1'>Seignorage Fee and Consideration Amount Collection Contract(SCCC) Awardee Details</h2>
    <div className='subhead3'>
      <table >
        <tbody>
          <tr>
            <td>Location of Quarry Lease:</td>
          </tr>
        </tbody>
      </table>
      <p className='nos1'>1.</p>
      <p className='nos2'>2.</p>
      <p className='nos3'>3.</p>
      <p className='nos4'>4.</p>
      </div>
        <h3 className='main-h'>Government Of Andhra Pradesh<br/>
        Department of Mines and Geology<br/>
        Transit Form - Original</h3>
        <div className="blue-box">
          {/*  */}
        </div>
        <h2 className="heading" style={{color:'#ed0a52', backgroundColor: '#3d1256'}}>Transit form</h2>
        <div className='Transit-Form'>
      <table className="form-table" style={{ margin: '0 auto' }}>
        <tbody>
          <tr className='bno-row'>
            <td><label htmlFor="bookNumber">Book Number</label></td>
            <td><input type="text" id="bookNumber" value={bookNumber} readOnly onChange={(e) => setBookNumber(e.target.value)} /></td>
          </tr>
          <tr className='fno-row' >
            <td><label htmlFor="formNumber">Form Number</label></td>
            <td><input type="text" id="formNumber" value={formNumber} readOnly onChange={(e) => setFormNumber(e.target.value)} /></td>
          </tr>
          <tr className='date-now'>
            <td><label htmlFor="currentDate">Date</label></td>
            <td><input type="date" id="currentDate" value={currentDate} onChange={(e) => setCurrentDate(e.target.value)} /></td>
          </tr>
          <tr className='validity'>
            <td><label htmlFor="validUpto" style={{color:'blue'}}>Valid Upto</label></td>
            <td><input type="date" id="validUpto" style={{color:'blue'}} value={validUpto} onChange={(e) => setValidUpto(e.target.value)} /></td>
          </tr>
        </tbody>
      </table>
    </div>
    <h2 className='scc-head' style={{color:'#ed0a52', backgroundColor: '#3d1256'}}>SCCC Awardee Details</h2>
    <div className='Sccc-awardee' style={{ display: 'flex', justifyContent: 'center' }}>
      <table style={{ textAlign: 'center' }}>
        <tbody>
          <tr>
            <td><label htmlFor="contractorName">Contractor Name</label></td>
            <td><input type="text" id="contractorName" value={contractorName} readOnly onChange={(e) => setContractorName(e.target.value)} /></td>
          </tr>
          <tr>
            <td><label htmlFor="agreementNo">Agreement No</label></td>
            <td><input type="text" id="agreementNo" value={agreementNo} readOnly onChange={(e) => setAgreementNo(e.target.value)} /></td>
          </tr>
          <tr>
            <td><label htmlFor="gstRegistrationNo">GST Registration No</label></td>
            <td><input type="text" id="gstRegistrationNo" readOnly value={gstRegistrationNo} onChange={(e) => setGstRegistrationNo(e.target.value)} /></td>
          </tr>
          <tr>
            <td><label htmlFor="districtAllotted">District Allotted</label></td>
            <td><input type="text" id="districtAllotted" readOnly value={districtAllotted} onChange={(e) => setDistrictAllotted(e.target.value)} /></td>
          </tr>
          <tr className='district-code-row'>
            <td className='district-code-label'><label htmlFor="districtCode">District Code</label></td>
            <td className='district-code-input'><input type="text" id="districtCode" readOnly value={districtCode} onChange={(e) => setDistrictCode(e.target.value)} /></td>
          </tr>
        </tbody>
      </table>
    </div>
    <h2 className='min-head' style={{color:'#ed0a52', backgroundColor: '#3d1256'}}>Mineral Transport Details</h2>
    <div className='mineral-details'>
      <table className="form-table" style={{ margin: '0 auto' }}>
        <tbody>
          <tr>
            <td><label htmlFor="lesseeId">Lessee ID</label></td>
            <td>
              <select value={lesseeId} onChange={handleLesseeChange}>
                <option value={""}>Select ID</option>
                {lesseeids.map((options) => (
                  <option key={options.value} value={options.value}>
                    {options.label}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td><label htmlFor="lesseeName">Lessee Name & Address</label></td>
            <td><input type="text" id="lesseeName" value={lesseeNameandAddress} onChange={(e) => setLesseeNameandAddress(e.target.value)} /></td>
          </tr>
          <tr>
            <td><label htmlFor="lesseeGstNo">GST No</label></td>
            <td><input type="text" id="lesseeGstNo" value={lesseeGstNo} onChange={(e) => setLesseeGstNo(e.target.value)} /></td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <h2 className='mine-head' style={{color:'#ed0a52', backgroundColor: '#3d1256'}}>Mine Location</h2>
    <div className='Mine-details'>
      <table className="form-table" style={{ margin: '0 auto' }}>
        <tbody>
          <tr>
            <td><label htmlFor="syNo">Sy.No</label></td>
            <td>
              <select value={syNo} onChange={handleSyChange}>
                <option value={""}>Select Sy.No</option>
                {synos.map((options) => (
                  <option key={options.value} value={options.value}>
                    {options.label}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td><label htmlFor="village">Village</label></td>
            <td><input type="text" id="village" value={village} onChange={(e) => setVillage(e.target.value)} /></td>
          </tr>
          <tr>
            <td><label htmlFor="mandal">Mandal</label></td>
            <td><input type="text" id="mandal" value={mandal} onChange={(e) => setMandal(e.target.value)} /></td>
          </tr>
          <tr>
            <td><label htmlFor="district">District</label></td>
            <td><input type="text" id="district" value={district} onChange={(e) => setDistrict(e.target.value)} /></td>
          </tr>
          <tr>
            <td><label htmlFor="leaseExtent">Extent of Lease</label></td>
            <td><input type="text" id="leaseExtent" value={leaseExtent} onChange={(e) => setLeaseExtent(e.target.value)} /></td>
          </tr>
          <tr>
            <td><label htmlFor="mineralName">Mineral Name</label></td>
            <td><input type="text" id="mineralName" value={mineralName} onBlur={handleMineralChange} onChange={(e) => setMineralName(e.target.value)} /></td>
          </tr>
          <tr>
            <td><label htmlFor="quantity">Quantity in Cbm/in MT</label></td>
            <td><input type="text" id="quantity" value={quantity} onBlur={handleQuantityChange} onChange={(e) => setQuantity(e.target.value)} /></td>
          </tr>
          <tr>
            <td><label htmlFor="saleValue">Sale Value of Mineral</label></td>
            <td><input type="text" id="saleValue" value={saleValue} onChange={(e) => setSaleValue(e.target.value)} /></td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 className='cons-head' style={{color:'#ed0a52', backgroundColor: '#3d1256'}}>Consignee</h2>
    <div className='consignee'>
      <table className="form-table" style={{ margin: '0 auto' }}>
        <tbody>
          <tr>
            <td><label htmlFor="consigneeName">Consignee Name & Address</label></td>
            <td><textarea id="consigneeName" value={consigneeNameandAddress} onChange={(e) => setConsigneeNameandAddress(e.target.value)} /></td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <h2 className='trans-head' style={{color:'#ed0a52', backgroundColor: '#3d1256'}}>Transport Details</h2>
    <div className='Transport-details'>
      <table className="form-table" style={{ margin: '0 auto' }}>
        <tbody>
          <tr>
            <td><label htmlFor="driverLicenceNo">Driver Licence No</label></td>
            <td>
              <select value={driverLicenceNo} onChange={handleDriverChange}>
                <option value={""}>Select DL</option>
                {licencenos.map((options) => (
                  <option key={options.value} value={options.value}>
                    {options.label}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td><label htmlFor="driverName">Driver Name</label></td>
            <td><input type="text" id="driverName" value={driverName} onChange={(e) => setDriverName(e.target.value)} /></td>
          </tr>
          <tr>
            <td><label htmlFor="vehicleNo">Vehicle No</label></td>
            <td><input type="text" id="vehicleNo" value={vehicleNo} onChange={(e) => setVehicleNo(e.target.value)} /></td>
          </tr>
          <tr>
            <td><label htmlFor="destination">Destination</label></td>
            <td><input type="text" id="destination" value={destination} onChange={(e) => setDestination(e.target.value)} /></td>
          </tr>
          <tr>
            <td><label htmlFor="destinationDistance">Distance of Destination (km)</label></td>
            <td><input type="text" id="destinationDistance" value={destinationDistance} onChange={(e) => setDestinationDistance(e.target.value)} /></td>
          </tr>
          <tr>
            <td><label htmlFor="arrivalDateTime">Arrival Date and Time</label></td>
            <td><input type="datetime-local" id="arrivalDateTime" value={arrivalDateTime} onChange={(e) => setArrivalDateTime(e.target.value)} /></td>
          </tr>
          <tr>
            <td><label htmlFor="dispatchDateTime">Dispatch Date and Time</label></td>
            <td><input type="datetime-local" id="dispatchDateTime" value={dispatchDateTime} onChange={(e) => setDispatchDateTime(e.target.value)} /></td>
          </tr>
        </tbody>
      </table>
    </div>
    <h4 className='sign-sccc' >Authorized Signature and Stamp <br/>  of SCC Contractor</h4>
      <h4 className='sign-driver'>Signature of Driver</h4>

      <div className='qr-code'>
      <QRCode size={100} className="qr-code" bgColor='white' fgColor='black' value={qrCode} ></QRCode>
      </div>
      </div>
      <div className='button-container'>
          <ReactToPrint
            trigger={() => <button type="button" className='print_button'>Print</button>}
            content={() => printRef.current} // Ref to the component you want to print
          />

      <button type="submit" className='submit_button'>Submit</button>
      </div>
    </form>
    </div>
  );
};

export default PermitMaster;
